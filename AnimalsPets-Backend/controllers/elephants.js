const Elephant = require('../models/elephant');

const allElephants = async ( req, res ) => {

    try {
        const [ elephants, total ] = await Promise.all ([
            Elephant.find({}),
            Elephant.countDocuments(),
        ])

        res.status(200).json({
            ok: true,
            msg: `Exitosa respuesta`,
            elephants,
            total
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error inesperado ... ',
        });
      }
}

const createElephant = async ( req, res ) => {

    
    try {

        const elephant = new Elephant(req.body)
        await elephant.save()
 
        res.status(200).json({
            ok: true,
            msg: `Exitosa respuesta`,
            elephant
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error!! Ya existe Nombre con ese index',
          error:error
        });
    }
} 

const updateElephant = async ( req, res ) => {
    const uid = req.params.id
    try {
        const elephantBD = await Elephant.findById( uid );
        if (!elephantBD){
            return res.status(401).json({
                ok: false,
                msg: `El Elefante no Existe`
            })
        }
        const existElephant = await Elephant.find( { index: req.body.index } );
        if (existElephant){
            return res.status(401).json({
                ok: false,
                msg: `un Elefante ya tiene este index Existente`
            })
        }

        const elephantUpdate = await Elephant.findOneAndUpdate(uid, req.body, { new: true });

        res.status(200).json({
          ok: true,
          msg: 'Se actualizo con exito',
          elefante: elephantUpdate,
        });


    } catch (error) {
        console.log(error);
       return res.status(400).json({
          ok: false,
          msg: 'error inesperado',
        });
    }

}


const  deleteElephant = async ( req, res ) => {
    const uid = req.params.id;
    const elephantdelete = await Elephant.findByIdAndDelete(uid);
  
    if (!elephantdelete) {
      res.status(404).json({
        ok: false,
        msg: 'El elefante no existe',
      });
    } else {
     return res.status(200).json({
        ok: true,
        msg: 'elefante eliminado',
        elefante: elephantdelete,
      });
    }
}
const allWord = async (req, res) => {
  try {
    const word = req.params.word;
    const regex = new RegExp(word, 'i');

    const elephant = await Elephant.find({ name: regex })

    res.status(200).json({
      ok: true,
      msg: ' se enceontro ',
      elephant
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const sex = async (req, res ) => {

  
    const word = req.params.sex;
    console.log(word);

    await Elephant.find({ sex: word }).exec((err, resp) =>{
        if( err ){ 
          return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
          });
        } 
         res.status(200).json({
            ok: true,
            msg: ' se enceontro ',
            elephant: resp
          });
        
    })

    
 

}

const specie = async (req, res ) => {

  
    const word = req.params.specie;
  console.log(word);
   await Elephant.find({ species: word }).exec( (err, resp) => {

      if(err) {
        return res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador',
        });
      }
       res.status(200).json({
        ok: true,
        msg: ' se enceontro ',
        elephant: resp
      })
   })
  
}


module.exports = {
    allElephants,
    createElephant,
    updateElephant,
    deleteElephant,
    allWord,
    sex,
    specie
} 