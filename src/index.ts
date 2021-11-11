import express from "express";
let app = express();
app.use(express.json());
app.use(express.urlencoded());


class User {
  constructor(
    public id: number,
    public name: string,
    public cpf: string,
    public email: string,
    public age: number,
    public transactions: Array<Transaction>
  ) {}
}



let usuario: User[] = [];
let id = 1;


app.post("/users", (req, res) => {
  let { name, cpf, email, age } = req.body;

  
  if (!name || !cpf || !email || !age) {
    res.status(418).send({ Message: "informe os dados" });
  }


    
  

  let transactions: Transaction[] = [];
  let newUsers: User = new User(
    id,
    name,
    cpf,
    email,
    age,
    transactions
  );

  id++;

  usuario.push(newUsers);
  res.send({
    usuario,
  });
});




app.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let indexDoCliente = id - 1;

  
  if (id < 1 || id > usuario.length) {
    res.status(404).send({
      
      mensagem: `O cliente do index ${indexDoCliente+1} não foi encontrado`,
    });
  }

  res.status(200).send({
    mensagem: "ok",
    cliente: usuario[indexDoCliente],
  });
});


app.get('/users', (req, res) => {
  res.json(usuario)
})




app.put("/users/:id", (req,res)=>{
  let id = parseInt(req.params.id);
  let indexDoCliente = id - 1;
  let name = req.body.name;

  if(usuario.find(users => users.id == id)){
    
    usuario[indexDoCliente].name = name 
    res.status(200).send(usuario[indexDoCliente])
  }
  else res.status(404).send({"Message": "Cliente não encontrado!"})
  });



app.delete("/users/:id", (req,res)=>{
  let id = req.params.id;
  let exibir = usuario[parseInt(id)-1];
  let possue = false;
 
  usuario.forEach((exibir)=>{
    if(exibir.id==parseInt(id))possue=true;
  });

  if(possue){
    usuario.splice(parseInt(id)-1,1);
    res.send({
      message:`Cliente ${exibir.name} removido`,
      users: usuario,
    });
  }else{
    res.send({
      message: `Cliente não encontrado!`,
    });
  }
  
});




 
class Transaction {
  constructor(
    public userId: number,
    public title: string,
    public value: number,
    public type: string
  ) {}
}

let userId = 1;


app.post("/users/:userId/transactions", (req, res) => {
  let { title, value, type } = req.body;
  let id = parseInt(req.params.userId);
  

  
  if (!title || !value || !type) {
    res.status(418).send({ Message: "informe os dados" });
  }

  let index = usuario.findIndex(item=> item.id == id);

  

  let newTransacoes: Transaction = new Transaction(
    userId,
    title,
    value,
    type
  );

  usuario[index].transactions.push(newTransacoes)

  userId++

  res.send({
    message: `ok`,
    x:usuario[index].transactions
  });

  
});


app.get("/users/:userId/transactions/:id", (req, res) => {
  let id = Number(req.params.id);
  let userId = Number(req.params.userId);
  let indexDoCliente = id - 1;

  
  if (id < 1 || id > usuario.length) {
    res.status(404).send({
      
      mensagem: `O cliente do index ${indexDoCliente+1} não foi encontrado`,
    });
  }

  if (userId < 1 || userId > usuario.length) {
    res.status(404).send({
      
      mensagem: `O recado ${userId} não foi encontrado`,
    });
  }

  res.status(200).send({
    mensagem: "ok",
    cliente: usuario[indexDoCliente]
  });
});


app.get("/users/:userId/transactions/", (req, res) => {
  res.json(usuario)
})











//ENDEREÇO http://localhost:8081/
app.listen(8081, () => {
  console.log("servidor iniciou");
});

