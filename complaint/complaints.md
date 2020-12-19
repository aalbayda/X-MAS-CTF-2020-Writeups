## X-Mas 2020: Complaints

**Category**: Misc

The only clue we get is the problem description:

> Do you want to file a formal complaint? Use this address and we'll take care of redirecting it to /dev/null.

When I connect to the port I'm prompted for some input, and it seems that with almost anything I type nothing happens.

![enter image description here](https://i.imgur.com/2EZ7BKY.png)

That's appropriate. Operations are commonly redirected to */dev/null* to test if it has succeeded, regardless of output. In fact it discards the output entirely.

The shell program would look something like this:

    [any user input] > /dev/null
Which explains why I've been getting no response.

To get around this I would need to block the redirection. If I type in `[command] #` I could get a command of my choice to run, while commenting out `> /dev/null` so that the result continues to print in stdout.

Now I still can't type in anything - it will be treated as a regular string and discarded. But I can use`eval` to parse and run other shell commands I'll need, like `ls` and `cd`. Let's try it with `ls`:

![enter image description here](https://i.imgur.com/c4V3pj1.png)

I can see `flag.txt` - the goal is to open it of course. But my options are limited: common tools like `more` and `cat`have been removed from this machine's binaries. Inspecting `bin` confirms this.

![enter image description here](https://i.imgur.com/61iConD.png)

What I can also see though, is `bash`. Running the host's bash shell directly would allow me to read the contents of `flag.txt` by redirection. This is actually unique to bash, and wouldn't work with dash or sh, which also exist in the host's machine.

When I run bash the program prompts me again, signalling that I've entered the shell. This also means I no longer need `eval` to run commands. I can run them directly, but now have to redirect to output to stdout myself using the appropriate [file descriptors](https://www.brianstorti.com/understanding-shell-script-idiom-redirect/).

![enter image description here](https://i.imgur.com/wepkbMw.png)
![enter image description here](https://i.imgur.com/x7MeEP4.png)


Now I can trick bash into letting me read the file:

![enter image description here](https://i.imgur.com/pwhkYvq.png)



