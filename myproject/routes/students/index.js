'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        fastify.pg.connect()
        const client = await fastify.pg.connect();
        const { rows } = await client.query('SELECT * FROM students');
        client.release();
        return rows;
        }),
    fastify.put('/:stid', async (req, reply) => {
        const client = await fastify.pg.connect()
        console.log(req.params)
        console.log(req.body)
        try {
            const { email } = req.body
            const { rows } = await client.query(
                `UPDATE students SET email='${req.body.email}' WHERE stid='${req.params.stid}' RETURNING *`
            )
            
            reply.code(201).send(rows)
        } finally {
            client.release()
        }
        })
}