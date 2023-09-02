import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  detailContact,
  editContact,
  removeData,
  saveContact,
  showList,
} from "./contacts.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add new contact",
    builder: {
      name: {
        describe: "name",
        demandOption: true,
        type: "string",
      },
      telp: {
        describe: "telephone number",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.telp, argv.email);
    },
  })
  .command({
    command: "remove",
    describe: "Remove contact",
    builder: {
      name: {
        describe: "name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      removeData(argv.name);
    },
  })
  .command({
    command: "list",
    describe: "Show list contact",
    handler() {
      showList();
    },
  })
  .command({
    command: "detail",
    describe: "Show detail contact by name",
    builder: {
      name: {
        describe: "name",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.name);
    },
  })
  .command({
    command: "edit",
    describe: "Edit contact",
    builder: {
      prop: {
        describe: "property",
        demandOption: true,
        type: "string",
      },
      value: {
        describe: "value",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      editContact(argv.prop, argv.value);
    },
  })
  .demandCommand()
  .parse();
