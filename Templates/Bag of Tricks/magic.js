/**
 * This is the sidecar file that keeps track of in game objects.
 *
 * These functions are called from within Inform to keep track of state.
 */

class Thing {
  constructor(name, id, location, inInventory) {
    this.name = name;
    this.id = id;
    this.location = location;
    this.inInventory = inInventory;
  }
}
class Rulebook {
  constructor(num, name, routine) {
    this.num = num;
    this.name = name;
    this.routine = routine;
  }
}
class MagicBag {
  static instance = null;

  static getInstance() {
    if (this.instance === null) {
      this.instance = new MagicBag();
    }
    return this.instance;
  }

  constructor() {
    this.things = [];
    this.rooms = [];
    this.actionsList = [];
    this.actionsMap = {};
    this.rulebooks = [];
  }

  addThing(thing) {
    this.things.push(
      new Thing(thing.name, thing.id, thing.location, thing.inInventory)
    );
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  setActions(actions) {
    this.actionsList = actions;
    this.actionsList.forEach((action) => {
      this.actionsMap[action.name.toLowerCase()] = action;
    });
  }

  setRulebooks(rulebooks) {
    this.rulebooks = rulebooks.map((rulebook) => {
      return new Rulebook(
        rulebook.num,
        rulebook.name,
        `B${rulebook.num}_` +
          rulebook.name.toLowerCase().replace(/\s/g, "_").substring(0, 23)
      );
    });

    // this.assignRulebooksToActions();
  }

  assignRulebooksToActions() {
    this.rulebooks.forEach((rulebook) => {
      let matches = rulebook.name.match(
        /^(check|carry out|report)\s(.*)\s(rulebook)$/i
      );
      if (matches) {
        let action = this.actionsMap[matches[2].toLowerCase()];
        switch (matches[1]) {
          case "check":
            action.checkRulebook = rulebook;
            break;
          case "carry out":
            action.carryOutRulebook = rulebook;
            break;
          case "report":
            action.reportRulebook = rulebook;
            break;
        }
      }
    });
  }
}
