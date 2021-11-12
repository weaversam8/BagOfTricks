/**
 * This is the sidecar file that keeps track of in game objects.
 *
 * These functions are called from within Inform to keep track of state.
 */

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
    this.actions = [];
    this.rulebooks = [];
  }

  addThing(thing) {
    this.things.push(thing);
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  setActions(actions) {
    this.actions = actions;
  }

  setRulebooks(rulebooks) {
    this.rulebooks = rulebooks.map((rulebook) => {
      rulebook.routine =
        `B${rulebook.num}_` +
        rulebook.name.toLowerCase().replace(/\s/g, "_").substring(0, 23);
      return rulebook;
    });
  }
}
