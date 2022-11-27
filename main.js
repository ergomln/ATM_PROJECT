
const loginNav = document.getElementById("loginNav");
const loginAlert = document.getElementById("loginAlert");
const loginSection = document.getElementById("loginSection");
const btnLogin = document.getElementById("login");
const mainSection = document.getElementById("mainSection");
const depositForm = document.getElementById("depositForm");
const withdrawForm = document.getElementById("withdrawForm");
const transferForm = document.getElementById("transferForm");
const depositBtn = document.getElementById("deposit");
const transferBtn = document.getElementById("transfer");
const withdrawBtn = document.getElementById("withdraw");

loginNav.hidden = true;
loginAlert.hidden = true;
mainSection.hidden = true;
depositForm.hidden = true;
withdrawForm.hidden = true;
transferForm.hidden = true;


const users = [
    {
        name: "izi",
        user: "izisolutions",
        saldo: 290,
        password: "izisolutions1"
    },
    {
        name: "Ezael",
        user: "ezawav",
        saldo: 67,
        password: "ezawav"
    },
    {
        name: "Diego",
        user: "cacaopapi",
        saldo: 100,
        password: "cacaopapi"
    },
    {
        name: "",
        user: "",
        saldo: 67,
        password: ""
    }
];


//Login
function login(user,password){
    let flag = true;

    for (let i = 0; i < users.length; i++) {
        const tempUser = users[i];
        if(user.toLowerCase() === tempUser.user.toLowerCase() && password == tempUser.password){
            loginAlert.classList.add("alert-success");
            loginAlert.textContent = `Login exitoso!`;
            setTimeout(function(){
                loginAlert.hidden = true;
                loginAlert.classList.remove("alert-success")}, 1500
            );
            welcome.textContent = `Welcome ${tempUser.name}`;
            balance.textContent = `${tempUser.saldo}`;
            
            flag = false;

            loginAlert.hidden = false;
            loginNav.hidden = false;
            mainSection.hidden = false;
            loginSection.hidden = true;
        };
    };
    if(flag == true){
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Revisa tus datos e intenta nuevamente`;
        setTimeout(function() {
            loginAlert.hidden = true
            loginAlert.classList.remove("alert-danger")}, 3000
        );
        loginAlert.hidden = false;
    }
};

btnLogin.addEventListener("click", () => {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    
    login(user,password);
});


//Logout
const logOut = document.getElementById("logout");

logOut.addEventListener("click", ()=>{
    loginNav.hidden = true;
    loginAlert.hidden = true;
    mainSection.hidden = true;
    depositForm.hidden = true;
    withdrawForm.hidden = true;
    transferForm.hidden = true;
    loginSection.hidden = false;
});

//deposit
depositBtn.addEventListener("click", ()=>{
    loginNav.hidden = false;
    depositForm.hidden = false;
    mainSection.hidden = true;
});

const applyDeposit = document.getElementById("applyDeposit");
applyDeposit.addEventListener("click",()=>{
    const user = document.getElementById("user").value;
    let amount = parseInt(document.getElementById("depositAmount").value);
    let currentAccount = users.find(account => account.user === user);

    if (amount > 0 && (currentAccount.saldo + amount) <= 990){
        currentAccount.saldo += amount;
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-success");
        loginAlert.textContent = `Tu deposito de ${amount} fue exitoso`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-success")}, 3000
        );
        balance.textContent = currentAccount.saldo;
        depositForm.hidden = true;
        mainSection.hidden = false;
    } else if(amount <= 0){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Por favor ingresa un monto valido`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 3000
        );
    } else if ((currentAccount.saldo + amount) > 990){
        let maximum = 990 - currentAccount.saldo;
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Excediste el límite de balance de $990, máximo deposito permitido: ${maximum}, Intenta nuevamente.`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 5000
        );
    }
});

const cancelDeposit = document.getElementById("cancelDeposit");
cancelDeposit.addEventListener("click", ()=>{
    depositForm.hidden = true;
    mainSection.hidden = false;
})


//withdraw

withdrawBtn.addEventListener("click", ()=>{
    mainSection.hidden = true;
    withdrawForm.hidden = false;
});

let applyWithdraw = document.getElementById("applyWithdraw");
applyWithdraw.addEventListener("click", ()=>{
    const user = document.getElementById("user").value;
    let withdrawAmount = parseInt(document.getElementById("withdrawAmount").value);
    let currentAccount = users.find(account => account.user === user);

    if (withdrawAmount > currentAccount.saldo){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `No tienes saldo suficiente para retirar ese monto. Monto disponible: ${currentAccount.saldo}, Intenta nuevamente.`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 5000
        );
    } else if (currentAccount.saldo >= withdrawAmount){
        currentAccount.saldo -= withdrawAmount;
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-success");
        loginAlert.textContent = `el monto ${withdrawAmount} fue retirado exitosamente`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-success")}, 3000
        );
        balance.textContent = `${currentAccount.saldo}`
        withdrawForm.hidden = true;
        mainSection.hidden = false;
    } else if (withdrawAmount <= 0){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Ingresa un monto valido`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 3000
        );
    }
    
});

let cancelWithdraw = document.getElementById("cancelWithdraw");
cancelWithdraw.addEventListener("click", ()=>{
    withdrawForm.hidden = true;
    mainSection.hidden = false;
})

//transfer

transferBtn.addEventListener("click", ()=>{
    mainSection.hidden = true;
    transferForm.hidden = false;
});


const applyTransfer = document.getElementById("applyTransfer");
applyTransfer.addEventListener("click", ()=>{
    const user = document.getElementById("user").value;
    let currentAccount = users.find(account => account.user === user);
    let receiver = document.getElementById("receiverAccount").value.toLowerCase();
    let receiverAccount = users.find(account => account.user === receiver)
    let amount = parseInt(document.getElementById("transferAmount").value);

    if (currentAccount.balance <= 0){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Saldo insuficiente para transferencia`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 3000
        );
    } else if (amount > 0 && (currentAccount.saldo - amount) > 10 && (receiverAccount.saldo + amount) <=990){
        currentAccount.saldo -= amount;
        receiverAccount.saldo += amount;
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-success");
        loginAlert.textContent = `La transferencia de $${amount} a la cuenta ${receiverAccount.user} fue exitosa`
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-success")
        }, 3000);
        balance.textContent = `${currentAccount.saldo}`
        transferForm.hidden = true;
        mainSection.hidden = false;
    }else if (amount == 0 || amount > 990){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `monto inválido, intente nuevamente`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 3000
        );
    }else if ((receiverAccount.saldo + amount) > 990 || (currentAccount.saldo - amount) < 10){
        loginAlert.hidden = false;
        loginAlert.classList.add("alert-danger");
        loginAlert.textContent = `Transacción Inválida. Intente con un monto menor`;
        setTimeout(function(){
            loginAlert.hidden = true;
            loginAlert.classList.remove("alert-danger")}, 3000
        );
    }
})


const cancelTransfer = document.getElementById("cancelTransfer");
cancelTransfer.addEventListener("click", ()=>{
    mainSection.hidden = false;
    transferForm.hidden = true;
});
