const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {

    index(request, response) {
        const city = request.query.city
        return response.render('index')
    },

    async orphanage(request, response) {
        const id = request.query.id

        try {
            const db = await Database;
            const orphanage = await db.get('SELECT * FROM orphanages WHERE id = ?', [id])

            // orfanato inexistente
            if (!orphanage) {
                return response.status(404).send('Orfanato não encontrado!')
            }

            orphanage.images = (orphanage.images || '').split(',').filter(Boolean)
            orphanage.firstImage = orphanage.images[0]
            orphanage.open_on_weekends = orphanage.open_on_weekends == '1'

            return response.render('orphanage', { orphanage })
        } catch (error) {
            console.log(error)
            return response.send('Erro no database!')
        }
    },

    async orphanages(request, response) {
        try {
            const db = await Database;
             const orphanages = await db.all("SELECT * FROM orphanages")
        //colocar o orphanage pelo banco
            return response.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error)
            return response.send('Erro na BD!')
        }
    },

    createOrphanage(request, response) {
        return response.render('create-orphanage')

    },

    async saveOrphanage(request, response) {
        const fields = request.body;
    
        // validar se os campos estão preenchidos
        const required = ["lat", "lng", "name", "about", "whatsapp", "images", "instructions", "opening_hours", "open_on_weekends"];
        if (required.some((field) => !fields[field] || String(fields[field]).trim() === "")) {
          return response.status(400).send("Todos os campos devem ser preenchidos");
        }
    
        try {
          //sslvar um orfanato
          const db = await Database;
          await saveOrphanage(db, {
            lat: fields.lat,
            lng: fields.lng,
            name: fields.name,
            about: fields.about,
            whatsapp: fields.whatsapp,
            images: [].concat(fields.images).filter(Boolean).toString(),
            instructions: fields.instructions,
            opening_hours: fields.opening_hours,
            open_on_weekends: fields.open_on_weekends,
          });
    
          //redirecionamento
          return response.redirect("/orphanages");
        } catch (error) {
          console.log(error);
          return response.send("Erro no banco de dados!");
        }
      }
}