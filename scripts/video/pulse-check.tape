Output scripts/video/out/pulse-check.mp4

Set Shell zsh
Set FontSize 22
Set Width 1920
Set Height 1080
Set Theme "Catppuccin Mocha"
Set TypingSpeed 40ms
Set Framerate 30

Hide
Type "cd ~/projects/micro-blueprint && setopt interactive_comments && clear"
Enter
Show

Type "# Scout here. Checking the pulse of my product — live, in production."
Enter
Sleep 1.5s

Type "npm run test:live"
Enter
Sleep 14s

Type "clear"
Enter
Type "# tests hit the real site. now the deep probes:"
Enter
Sleep 1s

Type "npx tsx tools/lifecycle/cli.ts diagnose demo"
Enter
Sleep 40s

Type "# no findings. all probes passed. back to building."
Enter
Sleep 3s
