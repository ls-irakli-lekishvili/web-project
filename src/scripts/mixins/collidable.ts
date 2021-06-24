export default {
  addCollider(otherGameObject, callback) {
    (this as any).scene.physics.add.collider(this, otherGameObject, callback, null, this);
  }
};