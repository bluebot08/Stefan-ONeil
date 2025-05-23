// Interactive Terminal System
class CyberTerminal {
    constructor() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '~';
        
        // Available commands and their responses
        this.commands = {
            help: {
                description: 'Show available commands',
                execute: () => this.showHelp()
            },
            whoami: {
                description: 'Display user information',
                execute: () => this.whoami()
            },
            skills: {
                description: 'List technical capabilities',
                execute: () => this.listSkills()
            },
            projects: {
                description: 'Show current projects',
                execute: () => this.listProjects()
            },
            contact: {
                description: 'Display contact information',
                execute: () => this.showContact()
            },
            clear: {
                description: 'Clear terminal output',
                execute: () => this.clearTerminal()
            },
            ls: {
                description: 'List directory contents',
                execute: (args) => this.listDirectory(args)
            },
            cat: {
                description: 'Display file contents',
                execute: (args) => this.catFile(args)
            },
            pwd: {
                description: 'Print working directory',
                execute: () => this.printWorkingDirectory()
            },
            date: {
                description: 'Display current date and time',
                execute: () => this.showDate()
            },
            history: {
                description: 'Show command history',
                execute: () => this.showHistory()
            },
            matrix: {
                description: 'Enter the Matrix',
                execute: () => this.enterMatrix()
            },
            exit: {
                description: 'Exit terminal',
                execute: () => this.exitTerminal()
            },
            sudo: {
                description: 'Execute command as superuser',
                execute: (args) => this.sudo(args)
            },
            hack: {
                description: '🚫 Access denied',
                execute: () => this.hackAttempt()
            },
            ai: {
                description: 'Information about AI projects',
                execute: () => this.aiInfo()
            },
            tokyo: {
                description: 'Information about Tokyo location',
                execute: () => this.tokyoInfo()
            },
            easter: {
                description: 'Hidden command',
                execute: () => this.easterEgg(),
                hidden: true
            }
        };
        
        this.init();
    }
    
    init() {
        if (!this.terminalInput || !this.terminalOutput) return;
        
        // Focus terminal input when clicking on terminal
        document.querySelector('.terminal-window')?.addEventListener('click', () => {
            this.terminalInput.focus();
        });
        
        // Handle input events
        this.terminalInput.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
        
        // Initial focus
        this.terminalInput.focus();
        
        // Add welcome message
        this.addOutput('Welcome to Stefan\'s Neural Terminal v2.5.1', 'system');
        this.addOutput('Type "help" for available commands.', 'system');
        this.addOutput('', 'system');
    }
    
    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this.executeCommand();
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                this.navigateHistory('up');
                break;
                
            case 'ArrowDown':
                event.preventDefault();
                this.navigateHistory('down');
                break;
                
            case 'Tab':
                event.preventDefault();
                this.autoComplete();
                break;
                
            case 'l':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.clearTerminal();
                }
                break;
        }
    }
    
    executeCommand() {
        const input = this.terminalInput.value.trim();
        if (!input) return;
        
        // Add command to history
        this.commandHistory.push(input);
        this.historyIndex = this.commandHistory.length;
        
        // Display the command
        this.addOutput(input, 'command');
        
        // Parse and execute command
        const [command, ...args] = input.toLowerCase().split(' ');
        
        if (this.commands[command]) {
            try {
                this.commands[command].execute(args);
            } catch (error) {
                this.addOutput(`Error executing command: ${error.message}`, 'error');
            }
        } else {
            this.addOutput(`Command not found: ${command}. Type "help" for available commands.`, 'error');
        }
        
        // Clear input
        this.terminalInput.value = '';
        
        // Scroll to bottom
        this.scrollToBottom();
    }
    
    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.terminalInput.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.terminalInput.value = '';
            }
        }
    }
    
    autoComplete() {
        const input = this.terminalInput.value;
        const matches = Object.keys(this.commands).filter(cmd => 
            cmd.startsWith(input.toLowerCase())
        );
        
        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`, 'info');
        }
    }
    
    addOutput(text, type = 'response') {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('terminal-line');
        
        if (type === 'command') {
            outputDiv.innerHTML = `<span class="prompt">stefan@tokyo:~$</span> <span class="command">${text}</span>`;
        } else {
            outputDiv.innerHTML = `<div class="terminal-response ${type}">${text}</div>`;
        }
        
        this.terminalOutput.appendChild(outputDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }
    
    // Command implementations
    showHelp() {
        this.addOutput('Available commands:', 'info');
        this.addOutput('', 'system');
        
        Object.entries(this.commands).forEach(([cmd, data]) => {
            if (!data.hidden) {
                this.addOutput(`  ${cmd.padEnd(12)} - ${data.description}`, 'info');
            }
        });
        
        this.addOutput('', 'system');
        this.addOutput('Use arrow keys to navigate command history.', 'info');
        this.addOutput('Press Tab for auto-completion.', 'info');
        this.addOutput('Ctrl+L to clear terminal.', 'info');
    }
    
    whoami() {
        this.addOutput('Stefan O\'Neil - AI Solutions Engineer', 'info');
        this.addOutput('Status: Online | Location: Tokyo, Japan', 'info');
        this.addOutput('Specialization: LLM Agent Development', 'info');
        this.addOutput('Current Focus: Building applications that leverage AI to solve complex problems', 'info');
        this.addOutput('', 'system');
        this.addOutput('>>> Access Level: Admin', 'success');
    }
    
    listSkills() {
        this.addOutput('=== TECHNICAL CAPABILITIES ===', 'info');
        this.addOutput('', 'system');
        
        const skills = [
            '🤖 LLM Integration        ████████████████████ 95%',
            '⚡ Agent Development      ████████████████████ 90%',
            '💻 JavaScript/TypeScript  ████████████████████ 92%',
            '🐍 Python                ████████████████████ 88%',
            '🌐 Web Development       ████████████████████ 94%',
            '🏗️  System Architecture   ████████████████████ 87%',
            '🔧 Problem Solving       ████████████████████ 96%',
            '🎯 Innovation            ████████████████████ 93%'
        ];
        
        skills.forEach(skill => {
            this.addOutput(skill, 'success');
        });
        
        this.addOutput('', 'system');
        this.addOutput('>>> All systems operating at optimal efficiency', 'success');
    }
    
    listProjects() {
        this.addOutput('=== ACTIVE PROJECT MODULES ===', 'info');
        this.addOutput('', 'system');
        
        const projects = [
            {
                id: '#001',
                name: 'NEURAL QA MATRIX',
                status: 'ACTIVE',
                description: 'LLM agent system for comprehensive media content analysis'
            },
            {
                id: '#002',
                name: 'LEAD NEXUS SYSTEM', 
                status: 'DEVELOPMENT',
                description: 'Integrated AI platform for lead generation and CRM automation'
            },
            {
                id: '#003',
                name: 'CYBERPUNK PORTFOLIO',
                status: 'LIVE',
                description: 'Interactive portfolio with Matrix-inspired design'
            }
        ];
        
        projects.forEach(project => {
            this.addOutput(`${project.id} ${project.name}`, 'info');
            this.addOutput(`     Status: ${project.status}`, 'system');
            this.addOutput(`     Description: ${project.description}`, 'system');
            this.addOutput('', 'system');
        });
        
        this.addOutput('>>> Type "projects" on main site to see detailed view', 'info');
    }
    
    showContact() {
        this.addOutput('=== CONTACT INFORMATION ===', 'info');
        this.addOutput('', 'system');
        this.addOutput('📧 Email: oneil.stefan@gmail.com', 'info');
        this.addOutput('🐙 GitHub: https://github.com/bluebot08', 'info');
        this.addOutput('💼 LinkedIn: https://linkedin.com/in/stefanoneil', 'info');
        this.addOutput('🐦 Twitter: https://twitter.com/StefanOneil', 'info');
        this.addOutput('', 'system');
        this.addOutput('>>> Secure communication channels established', 'success');
    }
    
    clearTerminal() {
        this.terminalOutput.innerHTML = '';
        this.addOutput('Terminal cleared.', 'system');
    }
    
    listDirectory(args) {
        const directory = args[0] || this.currentDirectory;
        
        this.addOutput(`Listing contents of ${directory}:`, 'info');
        this.addOutput('', 'system');
        
        const files = [
            'drwxr-xr-x  stefan  staff   projects/',
            'drwxr-xr-x  stefan  staff   skills/',
            '-rw-r--r--  stefan  staff   about.txt',
            '-rw-r--r--  stefan  staff   contact.txt',
            '-rwxr-xr-x  stefan  staff   neural_qa.exe',
            '-rwxr-xr-x  stefan  staff   lead_nexus.exe',
            '-rw-r--r--  stefan  staff   README.md'
        ];
        
        files.forEach(file => {
            this.addOutput(file, 'system');
        });
    }
    
    catFile(args) {
        if (!args[0]) {
            this.addOutput('Usage: cat <filename>', 'error');
            return;
        }
        
        const filename = args[0].toLowerCase();
        
        switch (filename) {
            case 'about.txt':
                this.addOutput('=== ABOUT STEFAN O\'NEIL ===', 'info');
                this.addOutput('', 'system');
                this.addOutput('AI Solutions Engineer based in Tokyo, Japan.', 'system');
                this.addOutput('Specializing in LLM agent development and integration.', 'system');
                this.addOutput('Passionate about pushing the boundaries of what\'s possible with AI.', 'system');
                break;
                
            case 'readme.md':
                this.addOutput('# Stefan O\'Neil Portfolio', 'info');
                this.addOutput('', 'system');
                this.addOutput('Interactive cyberpunk-themed portfolio showcasing AI projects.', 'system');
                this.addOutput('Built with modern web technologies and Matrix-inspired design.', 'system');
                this.addOutput('', 'system');
                this.addOutput('## Features:', 'info');
                this.addOutput('- Matrix rain loading animation', 'system');
                this.addOutput('- Interactive terminal interface', 'system');
                this.addOutput('- Responsive cyberpunk design', 'system');
                this.addOutput('- Project showcases with live demos', 'system');
                break;
                
            case 'contact.txt':
                this.showContact();
                break;
                
            default:
                this.addOutput(`cat: ${filename}: No such file or directory`, 'error');
        }
    }
    
    printWorkingDirectory() {
        this.addOutput(`/home/stefan${this.currentDirectory === '~' ? '' : this.currentDirectory}`, 'info');
    }
    
    showDate() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tokyo'
        };
        
        this.addOutput(now.toLocaleDateString('en-US', options) + ' JST', 'info');
        this.addOutput('Location: Tokyo, Japan 🗾', 'info');
    }
    
    showHistory() {
        this.addOutput('Command history:', 'info');
        this.addOutput('', 'system');
        
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${(index + 1).toString().padStart(3)} ${cmd}`, 'system');
        });
    }
    
    enterMatrix() {
        this.addOutput('🔴 Entering the Matrix...', 'error');
        this.addOutput('', 'system');
        
        setTimeout(() => {
            this.addOutput('⚡ Neural link established', 'success');
            this.addOutput('🌐 Connecting to mainframe...', 'info');
            
            setTimeout(() => {
                this.addOutput('💊 Choose your pill:', 'info');
                this.addOutput('   🔵 Blue pill - Return to reality', 'info');
                this.addOutput('   🔴 Red pill - See how deep the rabbit hole goes', 'info');
                this.addOutput('', 'system');
                this.addOutput('>>> You\'re already in the Matrix, Neo.', 'success');
            }, 1500);
        }, 1000);
    }
    
    exitTerminal() {
        this.addOutput('Goodbye, user. Until next time...', 'info');
        this.addOutput('', 'system');
        this.addOutput('>>> Connection terminated', 'error');
        
        setTimeout(() => {
            document.querySelector('#terminal').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 1000);
    }
    
    sudo(args) {
        if (!args.length) {
            this.addOutput('Usage: sudo <command>', 'error');
            return;
        }
        
        const command = args.join(' ');
        
        if (command.includes('rm -rf')) {
            this.addOutput('🚫 Nice try, but I\'m not that easily fooled.', 'error');
            this.addOutput('>>> All critical systems protected', 'success');
        } else {
            this.addOutput('Password required for sudo access.', 'error');
            this.addOutput('>>> Access denied', 'error');
        }
    }
    
    hackAttempt() {
        this.addOutput('🚨 INTRUSION DETECTED 🚨', 'error');
        this.addOutput('', 'system');
        this.addOutput('Initiating security protocols...', 'error');
        
        setTimeout(() => {
            this.addOutput('🔒 All systems secured', 'success');
            this.addOutput('🕵️ Trace complete: Nice try, hacker!', 'info');
            this.addOutput('', 'system');
            this.addOutput('>>> Just kidding! This is a portfolio site 😄', 'success');
        }, 2000);
    }
    
    aiInfo() {
        this.addOutput('=== AI PROJECT OVERVIEW ===', 'info');
        this.addOutput('', 'system');
        this.addOutput('🧠 Developing cutting-edge LLM applications', 'info');
        this.addOutput('⚡ Agent-based automation systems', 'info');
        this.addOutput('🔬 Content analysis and quality assurance', 'info');
        this.addOutput('📊 Lead generation and CRM integration', 'info');
        this.addOutput('', 'system');
        this.addOutput('>>> The future is intelligent automation', 'success');
    }
    
    tokyoInfo() {
        this.addOutput('=== TOKYO OPERATIONS CENTER ===', 'info');
        this.addOutput('', 'system');
        this.addOutput('🏙️ Location: Tokyo, Japan', 'info');
        this.addOutput('🌐 Timezone: JST (UTC+9)', 'info');
        this.addOutput('☕ Fuel: Coffee and innovation', 'info');
        this.addOutput('🚄 Transport: Shinkansen-speed development', 'info');
        this.addOutput('', 'system');
        this.addOutput('>>> Operating in the cyberpunk capital of the world', 'success');
    }
    
    easterEgg() {
        // Trigger the Konami code easter egg
        document.dispatchEvent(new CustomEvent('easterEggActivated'));
        this.addOutput('🥚 Easter egg activated! Check the screen...', 'success');
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('terminal-input')) {
        window.cyberTerminal = new CyberTerminal();
    }
});

// Export for external use
window.CyberTerminal = CyberTerminal;
