import mongoose from 'mongoose'
import * as schemas from './schemas.mjs'
mongoose.pluralize(null);

const connectToDb = async (collection) => {
    await mongoose.connect(`mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@${process.env.mongoHost}/?retryWrites=true&w=majority`, {dbName: process.env.dbName})
}

const makeNamedSchemas = () => {
    Object.keys(schemas).forEach(schema => {
        eval(`const ${schema} = mongoose.model('${schema}', schemas.${schema});`);
    })
}

const scopedEval = async (context, expr) => {
    const evaluator = Function.apply(null, [...Object.keys(context), 'expr', "return eval('(async function() {return '+ expr + '})();')"]);
    let out = evaluator.apply(null, [...Object.values(context), expr]);
    
    return out;
}

export const execMongoQuery = async (req, res) => {
    if (!req.body.mongoQuery) return res.json({ error: true, message: "mongoQuery not passed in request body."})
    if (req.body.collection) await connectToDb(req.body.collection)
    else await connectToDb('test')
    
    try {
        // pass scope of mongoose variables to 
        // eval to mitigate credential leakage
        let out = await scopedEval({mongoose: mongoose}, req.body.mongoQuery.trim())

        return res.send(out);
    } catch(e) {
        return res.json({ error: true, message: `${e}` })
    }
}

makeNamedSchemas()