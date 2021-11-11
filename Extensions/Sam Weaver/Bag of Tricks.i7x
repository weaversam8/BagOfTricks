Bag of Tricks (for Glulx only) by Sam Weaver begins here.

"An extension that allows interacting with the Inform model world from third-party programs."

"Uses a modified version of the Vorple interpreter originally created by Juhana Leinonen."

Include Vorple by Juhana Leinonen.

Include object tree in the debugging log.
Include action creations in the debugging log.
Include spatial map in the debugging log.

Include (-
[ PrintActionDataJSON i ita;
  print "[";
  for (i=0:i<AD_RECORDS:i++) {
    ita = ActionData-->(1+6*i);
    print "{~slug~:~";
    print (DebugAction) ita;
    print "~,~id~:";
    print ita;
    print ",~name~:~";
    SayActionName(ita);
    if (i == AD_RECORDS - 1) print "~}";
    else print "~},";
  }
  print "]";
  rtrue;
];
-).

To say list of actions: (- PrintActionDataJSON(); -).
To say object ID for (O - an object): (- print {O}; -).

To say JSON for (thingy - a thing):	
	say "{ 'name' :  '[a thingy]', 'id' : '[object ID for thingy]', 'location' : '[object ID for location of thingy]' }";
	
To say JSON for (room - a room):
	say "{ 'name': '[a room]', 'id' : '[object ID for room]' }";

When play begins:
	repeat with item running through things:
		execute JavaScript command "magic.addThing([JSON for item])";
	repeat with room running through rooms:
		execute JavaScript command "magic.addRoom([JSON for room])";
	execute JavaScript command "magic.setActions([list of actions])".

Bag of Tricks ends here.