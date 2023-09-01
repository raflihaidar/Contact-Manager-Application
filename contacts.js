import chalk from "chalk";
import fs from "fs";

const dirPath = "./data";
const dataPath = "./data/contact.json";

if (!fs.existsSync(dirPath)) {
  fs.mkdir(dirPath, () => {
    fs.statSync(dirPath).isDirectory();
  });
}

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadData = () => {
  const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
  let contacts = JSON.parse(fileBuffer);

  return contacts;
};

export const saveContact = (name, telephone, email) => {
  const contact = {
    name,
    telephone,
    email,
  };

  //Get data and parsing to JSON
  const contacts = loadData();

  //Auth
  const duplicate = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  const checkEmail = email.match(/.com$/g);
  const checkNumber = telephone.length !== 24;

  if (duplicate) {
    console.log(chalk.red.inverse("Contact sudah tersedia"));
    return false;
  }

  if (!checkEmail && email === null) {
    console.log(chalk.red.inverse("Email tidak valid"));
    return false;
  }

  if (!checkNumber) {
    console.log(chalk.red.inverse("Nomer tidak valid"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("./data/contact.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse("Thank you, Your data has been saved!"));
};

export const removeData = (name) => {
  const contacts = loadData();

  const contactFiltered = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  fs.writeFileSync("./data/contact.json", JSON.stringify(contactFiltered));
  console.log(chalk.green.inverse("Removed data success!"));
};

export const showList = () => {
  const contacts = loadData();
  console.table(contacts);
  console.log(chalk.green.inverse("Show list Success!"));
};

export const detailContact = (name) => {
  const contacts = loadData();

  const id = contacts.findIndex((item) => {
    return item.name === name;
  });

  console.log(chalk.green.inverse("\n\nDETAIL CONTACT"));
  console.log("Nama \t\t: ", contacts[id].name);
  console.log("Telephone \t: ", contacts[id].telephone);
  console.log("Email \t\t: ", contacts[id].email + "\n\n");
};
