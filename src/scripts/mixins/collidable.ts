export default {
  addCollider(otherGameObject, callback?) {
    (this as any).scene.physics.add.collider(this, otherGameObject, callback, null, this);
    return this;
  },

  bodyPositionDiff: 0,
  prevRay: null,
  prevHasHit: false,

  // optimizing rayCasting ugly code but works faster
  rayCast(body: Phaser.Physics.Arcade.Body,
          layer: Phaser.Tilemaps.TilemapLayer | null,
          facingRight: boolean,
          precision: number = 0,
          rayLength: number = 40): { ray: Phaser.Geom.Line; hasHit: boolean; } {

    this.bodyPositionDiff += body.x - body.prev.x;

    if ((Math.abs(this.bodyPositionDiff) <= precision) && this.prevRay !== null) {
      return {
        ray: (this.prevRay as unknown as Phaser.Geom.Line),
        hasHit: this.prevHasHit
      };
    }

    const { x, y, width, halfHeight } = body;
    const line = new Phaser.Geom.Line();
    let hasHit = false;

    if (facingRight) {
      line.x1 = x + width;
      line.y1 = y + halfHeight;
      line.x2 = line.x1 + rayLength;
      line.y2 = line.y1 + rayLength;
    } else {
      line.x1 = x;
      line.y1 = y + halfHeight;
      line.x2 = line.x1 - rayLength;
      line.y2 = line.y1 + rayLength;
    }


    const hits = layer?.getTilesWithinShape(line);
    if (hits && hits.length) {
      hasHit = this.prevHasHit = hits.some(hit => ~hit.index);
    }

    this.bodyPositionDiff = 0;
    (this.prevRay as unknown as Phaser.Geom.Line) = line;
    return { ray: line, hasHit };
  }
};