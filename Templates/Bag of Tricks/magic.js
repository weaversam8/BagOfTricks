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

class Action {
  constructor(slug, id, name, args) {
    this.slug = slug;
    this.id = id;
    this.name = name;
    this.args = args;
  }

  setRulebook(type, rulebook) {
    switch (type) {
      case "check":
        this.checkRulebook = rulebook;
        break;
      case "carry out":
        this.carryOutRulebook = rulebook;
        break;
      case "report":
        this.reportRulebook = rulebook;
        break;
    }
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
    this.actionsList = actions.map((action) => {
      return new Action(action.slug, action.id, action.name, action.args);
    });
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

    this.assignRulebooksToActions();
  }

  assignRulebooksToActions() {
    this.rulebooks.forEach((rulebook) => {
      let matches = rulebook.name.match(
        /^(check|carry out|report)\s(.*)\s(rulebook)$/i
      );
      if (matches) {
        let actionName = matches[2].toLowerCase();
        if (actionName in this.actionsMap) {
          let action = this.actionsMap[actionName];
          action.setRulebook(matches[1], rulebook);
        }
      }
    });
  }
}
