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
[ PrintRulebooksJSON i;
	print "[{";
	i = 0;
	do {
		if (i > 0) print ",{";
		print "~num~:";
		print i;
		print ",~address~:";
		print rulebooks_array-->i;
		print ",~name~:~";
		print (string) RulebookNames-->i;
		print "~}";
		i++;
	} until (rulebooks_array-->i == 0);
	print "]";
	rtrue;
];
! [ PrintIdentifiers a;
! 	a = #identifiers_table-->10;
! 	new_line;
! 	print a;
! 	new_line;
! 	print (string) a-->0;
! 	new_line;
! 	print (string) a-->1;
! 	new_line;
! 	!for (i=1:i<#identifiers_table-->0:i++) {
! 	!
! 	!}
! ];
-).

To say list of actions: (- PrintActionDataJSON(); -).
To say list of rulebooks: (- PrintRulebooksJSON(); -).
[ To say list of identifiers: (- PrintIdentifiers(); -). ]
To say object ID for (O - an object): (- print {O}; -).

To say JSON for (thingy - a thing):	
	say "{ 'name' :  '[a thingy]', 'id' : '[object ID for thingy]', 'location' : '[object ID for location of thingy]' }";
	
To say JSON for (room - a room):
	say "{ 'name': '[a room]', 'id' : '[object ID for room]' }";

To say the return value of rulebook (RB - number): (- print FollowRulebook({RB}); -).
Manually triggering a rulebook is an action applying to a number.
Understand "trigger [number]" as manually triggering a rulebook.
Carry out manually triggering a rulebook: say "[the return value of rulebook number understood]".

When play begins:
	repeat with item running through things:
		execute JavaScript command "magic.addThing([JSON for item])";
	repeat with room running through rooms:
		execute JavaScript command "magic.addRoom([JSON for room])";
	execute JavaScript command "magic.setActions([list of actions])";
	execute JavaScript command "magic.setRulebooks([list of rulebooks])";
	[ say "[list of identifiers]"; ]

Bag of Tricks ends here.