import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  detailContact,
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
        default: "undefined",
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
    describe: "Add new contact",
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
  .demandCommand()
  .parse();
