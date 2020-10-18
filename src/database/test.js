const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async db => {

    //inserir dados na tabela
    await saveOrphanage(db, {
        lat: "-8.8246433",
        lng: "13.3404238",
        name: "Lar infatil Kuzola",
        about: "Presta assistencia a criança de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
        whatsapp: "996957701",
        images: [
            "https://source.unsplash.com/random?id=1"
        ].toString(),
        instructions:"Venha como se sentir a vontade e traga muito amor e paciência para dar.",
        opening_hours: "Horário de visitas Das 18h até 8h", 
        open_on_weekends: "0"
        
    })

    //consultar dados da tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

    //consultar somente 1 orphanato pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "4"')
    console.log(orphanage)
})
