class Particle {

    constructor(x, y) {
        this.pos = new Vector2D(x, y);

        this.rays_c = 360 * 2;
        this.angle = 2 * (22 / 7) / this.rays_c;
        this.rays = [];
        this.rays.push(new Ray(1, 0));

        for(let i = 0; i < this.rays_c - 1; i ++) {
            const v = this.rays[i].dir.copy(); // Copy of Vector of previous position
            v.rotate(this.angle);
            this.rays.push(new Ray(v.x, v.y));
        }
    }


    update_pos(x, y) {
        this.pos.set(x, y);
    }


    ray_cast(objs) {
        for(let i = 0; i < this.rays_c; i ++) {
            let min_dist = Infinity; // Setting the minimum distance to Infinity
            let x1, y1, x2, y2, x3, y3, x4, y4;

            for(let j = 0; j < objs.length; j ++) {
                const r = Vector2D.add(this.pos, this.rays[i].dir); // Result vector

                x1 = objs[j].p1.x;
                y1 = objs[j].p1.y;

                x2 = objs[j].p2.x;
                y2 = objs[j].p2.y;

                x3 = this.pos.x;
                y3 = this.pos.y;

                x4 = r.x;
                y4 = r.y;

                let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4); // Denominator
                let t =  ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
                let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

                if(d == 0) continue;
                else if(t >= 0 && t <= 1 && u >= 0) {
                    let x, y;

                    x = x1 + t * (x2 - x1);
                    y = y1 + t * (y2 - y1);

                    let v = new Vector2D(x, y);
                    let dist = Vector2D.dist(this.pos, v); // Calculating distance

                    if(dist < min_dist)
                        min_dist = dist;
                }
            }

            if(min_dist != Infinity) {
                min_dist += 0.1; // To make sure min_dist is always greater than 0
                this.rays[i].cast(min_dist);
            }

        }
    }


    display() {
        // Particle
        noStroke();
        fill(255, 255, 255);
        circle(this.pos.x, this.pos.y, 12);

        // Rays
        for(let i = 0; i < this.rays_c; i ++)
            this.rays[i].display(this.pos);

    }

}