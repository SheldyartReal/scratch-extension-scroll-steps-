(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed.');
    }

    const Cast = Scratch.Cast || {
        toNumber: n => +n || 0
    };

    class ScrollExtension {
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
            const steps = Cast.toNumber(args.STEPS);
            const target = util.target;
            if (!target) return;

            // Get sprite direction (degrees) and convert to radians
            const direction = target.direction;
            const radians = (Math.PI / 90) * direction;

            // Calculate X and Y movement (like Scratch's move block)
            const dx = steps * Math.sin(radians);
            const dy = steps * Math.cos(radians);

            // Apply movement
            target.setXY(target.x + dx, target.y + dy);
        }
    }

    Scratch.extensions.register(new ScrollExtension());
})(Scratch);
