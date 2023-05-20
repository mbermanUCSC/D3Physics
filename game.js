// ------------------------------------------
// Physics Coin Collector game using Phaser
// Miles Berman
// D3
// ------------------------------------------

class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffb3'); // light yellow

        this.add.text(200, 250, 'Coin Collector!', { fontSize: '40px', fill: '#000' });
        this.add.text(200, 300, 'Press SPACE to start the game', { fontSize: '20px', fill: '#000' });
        this.add.text(200, 350, '<- & -> to move', { fontSize: '20px', fill: '#000' });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene1');
        });
    }
}

class GameScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene1' });
    }

    preload() {
        this.load.image('bucket', 'assets/bucket.png');
        this.load.image('circle', 'assets/circle.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffb3'); // light yellow

        this.bucket = this.physics.add.sprite(400, 550, 'bucket').setScale(0.1);
        this.bucket.body.allowGravity = false;
        this.bucket.body.setCollideWorldBounds(true);

        this.score = 0;
        this.scoreText = this.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.add.text(this.cameras.main.centerX, 16, 'Catch \'Em!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5, 0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1000, // spawn a new circle every 1000ms
            callback: this.spawnCircle,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(25000, () => { this.scene.start('GameScene2'); }, [], this); // go to scene 2 after 25000 milliseconds
    }

    spawnCircle() {
        let circle = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, 'circle').setScale(0.05);
        this.physics.add.collider(this.bucket, circle, this.collectCircle, null, this);
    }

    collectCircle(bucket, circle) {
        circle.destroy();
        this.score += 1;
        this.scoreText.setText('score: ' + this.score);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.bucket.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.bucket.setVelocityX(200);
        } else {
            this.bucket.setVelocityX(0);
        }
    }
}

class GameScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene2' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffb3'); // light yellow

        this.bucket = this.physics.add.sprite(400, 550, 'bucket').setScale(0.1);
        this.bucket.body.allowGravity = false;
        this.bucket.body.setCollideWorldBounds(true);

        this.score = 0;
        this.scoreText = this.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.add.text(this.cameras.main.centerX, 16, 'Opposite Day!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5, 0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1000,
            callback: this.spawnCircle,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(25000, () => { this.scene.start('GameScene3'); }, [], this); // go to scene 3 after 25000 milliseconds
    }

    spawnCircle() {
        let circle = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, 'circle').setScale(0.05);

        circle.body.setCollideWorldBounds(true);
        circle.body.onWorldBounds = true;

        circle.body.world.on('worldbounds', (body, up, down) => { 
            if (body.gameObject === circle && down) { 
                this.score++;
                this.scoreText.setText('score: ' + this.score);
                circle.destroy();
            } 
        }, this);

        this.physics.add.collider(this.bucket, circle, () => {
            circle.destroy();
            this.score--;
            this.scoreText.setText('score: ' + this.score);
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.bucket.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.bucket.setVelocityX(200);
        } else {
            this.bucket.setVelocityX(0);
        }
    }
}

class GameScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene3' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffb3'); // light yellow

        this.bucket = this.physics.add.sprite(400, 550, 'bucket').setScale(0.1);
        this.bucket.body.allowGravity = false;
        this.bucket.body.setCollideWorldBounds(true);

        this.score = 0;
        this.scoreText = this.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.add.text(this.cameras.main.centerX, 16, 'So Bouncy!', { fontSize: '32px', fill: '#000' }).setOrigin(0.5, 0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1000,
            callback: this.spawnCircle,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(25000, () => { this.scene.start('OutroScene'); }, [], this); // end game after 25000 milliseconds
    }

    spawnCircle() {
        let circle = this.physics.add.sprite(Phaser.Math.Between(0, 800), 0, 'circle').setScale(0.05);
        circle.body.setBounce(1);
        circle.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.bucket, circle, this.collectCircle, null, this);
    }

    collectCircle(bucket, circle) {
        circle.destroy();
        this.score += 1;
        this.scoreText.setText('score: ' + this.score);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.bucket.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.bucket.setVelocityX(200);
        } else {
            this.bucket.setVelocityX(0);
        }
    }
}

class OutroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OutroScene' });
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffb3'); // light yellow

        this.add.text(200, 250, 'Game Over!', { fontSize: '40px', fill: '#000' });
        this.add.text(200, 300, 'Press SPACE to restart the game', { fontSize: '20px', fill: '#000' });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene1'); // loops back to scene 1
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [IntroScene, GameScene1, GameScene2, GameScene3, OutroScene],
};

const game = new Phaser.Game(config);
