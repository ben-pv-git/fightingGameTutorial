class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        // max amount of frames in an image
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 40
    }

    // draw boxes
    draw() {
        // canvas is weird, crop size of an image is first 4 args after image
        // first 2 are starting position of crop, next 2 are width and height
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            // divide by framesMax cause theres a different num of
            // frames in shop image vs background image
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    // update hurtbox location
    update() {
        this.draw()
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}

class Fighter {
    constructor({ position, velocity, color = 'blue', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
        this.health = 100
    }

    // draw boxes
    draw() {
        // hurtbox
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    
        // hitbox
        if (this.isAttacking) {
            c.fillStyle = 'red'
            c.fillRect(
                this.hitBox.position.x,
                this.hitBox.position.y,
                this.hitBox.width,
                this.hitBox.height
            )
        }
    }

    // update hurtbox location
    update() {
        this.draw()
        // hitbox position starts from starting Sprite position,
        // update it as Sprite position changes
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y

        // update x and y coordinates based on velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // if hurtbox is at or past bottom of screen vertically, stop falling.
        // else, accelerate with gravity
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    // Sprite attack
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}