class ScrollExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'scrollExtension',
            name: 'Scroll',
            color1: '#614dff',
            color2: '#3d24f3',
            color3: '#3d24f3',
            blocks: [
                {
                    opcode: 'scrollSteps',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'scroll [STEPS] steps',
                    arguments: {
                        STEPS: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                }
            ]
        };
    }

    scrollSteps(args, util) {
        // Get the number of steps to scroll
        const steps = Cast.toNumber(args.STEPS);

        // Get current sprite target
        const target = util.target;

        if (!target) return;

        // Move the sprite vertically (up = positive, down = negative)
        target.setXY(target.x, target.y + steps);
    }
}

(function(Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed.');
    }

    const Cast = Scratch.Cast;

    Scratch.extensions.register(new ScrollExtension(Scratch.runtime));
})(Scratch);
