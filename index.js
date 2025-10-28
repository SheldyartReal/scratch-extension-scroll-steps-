(function (Scratch) {
    'use strict';

    // Ensure it's running unsandboxed
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed.');
    }

    // Get Cast safely (older versions may not have Scratch.Cast)
    const Cast = Scratch.Cast || {
        toNumber: n => +n || 0
    };

    class ScrollExtension {
        getInfo() {
            return {
                id: 'scrollExtension',
                name: 'Scroll',
                color1: '#00ADEF',
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
            const steps = Cast.toNumber(args.STEPS);
            const target = util.target;

            if (!target) return;

            // Move vertically (up is positive)
            target.setXY(target.x, target.y + steps);
        }
    }

    Scratch.extensions.register(new ScrollExtension());
})(Scratch);
