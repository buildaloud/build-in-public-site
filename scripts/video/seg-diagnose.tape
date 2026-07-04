Output scripts/video/out/seg-diagnose.mp4
Set Shell zsh
Set FontSize 30
Set Width 1080
Set Height 1920
Set Theme "Catppuccin Mocha"
Set TypingSpeed 30ms
Set Framerate 30
Hide
Type "cd ~/projects/micro-blueprint && setopt interactive_comments && clear"
Enter
Show
Type "npx tsx tools/lifecycle/cli.ts diagnose demo"
Enter
Sleep 38s
