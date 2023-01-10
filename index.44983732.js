$(document).ready(function () {
  var i,
    t,
    s,
    o = $(".wheel"),
    n = $(".active"),
    e = 0,
    h = $("#btnPlay"),
    s = 4e3,
    r = new TimelineMax(),
    a = new TimelineMax();
  r
    .to(n, 0.13, {
      rotation: -10,
      transformOrigin: "65% 36%",
      ease: Power1.easeOut,
    })
    .to(n, 0.13, { rotation: 3, ease: Power4.easeOut })
    .add("end"),
    h.click(function () {
      h.addClass("hide"),
        a.to(o, 20, {
          rotation: s,
          transformOrigin: "50% 50%",
          ease: Power4.easeOut,
          onUpdate: function () {
            Math.round(i) % 30 <=
              (t =
                (i = Math.round(this.target[0]._gsTransform.rotation)) - e) &&
              (r.progress() > 0.2 || 0 === r.progress()) &&
              r.play(0),
              i === s &&
                ($("body").addClass("final"),
                setTimeout(function () {
                  runConfeti();
                }, 1e3)),
              (e = i);
          },
        }),
        a.add("end");
    });
});
function runConfeti() {
  var i = Math.PI / 180;
  function t(i, s) {
    (this.x = i),
      (this.y = s),
      (this.Length = function () {
        return Math.sqrt(this.SqrLength());
      }),
      (this.SqrLength = function () {
        return this.x * this.x + this.y * this.y;
      }),
      (this.Equals = function (i, t) {
        return i.x == t.x && i.y == t.y;
      }),
      (this.Add = function (i) {
        (this.x += i.x), (this.y += i.y);
      }),
      (this.Sub = function (i) {
        (this.x -= i.x), (this.y -= i.y);
      }),
      (this.Div = function (i) {
        (this.x /= i), (this.y /= i);
      }),
      (this.Mul = function (i) {
        (this.x *= i), (this.y *= i);
      }),
      (this.Normalize = function () {
        var i = this.SqrLength();
        if (0 != i) {
          var t = 1 / Math.sqrt(i);
          (this.x *= t), (this.y *= t);
        }
      }),
      (this.Normalized = function () {
        var i = this.SqrLength();
        if (0 != i) {
          var s = 1 / Math.sqrt(i);
          return new t(this.x * s, this.y * s);
        }
        return new t(0, 0);
      });
  }
  function s(i, s, o, n) {
    (this.position = new t(i, s)),
      (this.mass = o),
      (this.drag = n),
      (this.force = new t(0, 0)),
      (this.velocity = new t(0, 0)),
      (this.AddForce = function (i) {
        this.force.Add(i);
      }),
      (this.Integrate = function (i) {
        var s = this.CurrentForce(this.position);
        s.Div(this.mass);
        var o = new t(this.velocity.x, this.velocity.y);
        o.Mul(i),
          this.position.Add(o),
          s.Mul(i),
          this.velocity.Add(s),
          (this.force = new t(0, 0));
      }),
      (this.CurrentForce = function (i, s) {
        var o = new t(this.force.x, this.force.y),
          n = this.velocity.Length(),
          e = new t(this.velocity.x, this.velocity.y);
        return e.Mul(this.drag * this.mass * n), o.Sub(e), o;
      });
  }
  function o(s, n) {
    (this.pos = new t(s, n)),
      (this.rotationSpeed = 600 * Math.random() + 800),
      (this.angle = i * Math.random() * 360),
      (this.rotation = i * Math.random() * 360),
      (this.cosA = 1),
      (this.size = 5),
      (this.oscillationSpeed = 1.5 * Math.random() + 0.5),
      (this.xSpeed = 40),
      (this.ySpeed = 60 * Math.random() + 50),
      (this.corners = []),
      (this.time = Math.random()),
      (this.frontColor = "#ffffff"),
      (this.backColor = "#ffffff");
    for (var e = 0; e < 4; e++) {
      var h = Math.cos(this.angle + i * (90 * e + 45)),
        r = Math.sin(this.angle + i * (90 * e + 45));
      this.corners[e] = new t(h, r);
    }
    (this.Update = function (t) {
      (this.time += t),
        (this.rotation += this.rotationSpeed * t),
        (this.cosA = Math.cos(i * this.rotation)),
        (this.pos.x +=
          Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * t),
        (this.pos.y += this.ySpeed * t),
        this.pos.y > o.bounds.y &&
          ((this.pos.x = Math.random() * o.bounds.x), (this.pos.y = 0));
    }),
      (this.Draw = function (i) {
        this.cosA > 0
          ? (i.fillStyle = this.frontColor)
          : (i.fillStyle = this.backColor),
          i.beginPath(),
          i.moveTo(
            this.pos.x + this.corners[0].x * this.size,
            this.pos.y + this.corners[0].y * this.size * this.cosA
          );
        for (var t = 1; t < 4; t++)
          i.lineTo(
            this.pos.x + this.corners[t].x * this.size,
            this.pos.y + this.corners[t].y * this.size * this.cosA
          );
        i.closePath(), i.fill();
      });
  }
  function n(o, e, h, r, a, c, l, p) {
    (this.particleDist = r),
      (this.particleCount = h),
      (this.particleMass = l),
      (this.particleDrag = p),
      (this.particles = []),
      (this.frontColor = "#ffffff"),
      (this.backColor = "#ffffff"),
      (this.xOff = Math.cos(i * c) * a),
      (this.yOff = Math.sin(i * c) * a),
      (this.position = new t(o, e)),
      (this.prevPosition = new t(o, e)),
      (this.velocityInherit = 2 * Math.random() + 4),
      (this.time = 100 * Math.random()),
      (this.oscillationSpeed = 2 * Math.random() + 2),
      (this.oscillationDistance = 40 * Math.random() + 40),
      (this.ySpeed = 40 * Math.random() + 80);
    for (var f = 0; f < this.particleCount; f++)
      this.particles[f] = new s(
        o,
        e - f * this.particleDist,
        this.particleMass,
        this.particleDrag
      );
    (this.Update = function (i) {
      var s = 0;
      (this.time += i * this.oscillationSpeed),
        (this.position.y += this.ySpeed * i),
        (this.position.x += Math.cos(this.time) * this.oscillationDistance * i),
        (this.particles[0].position = this.position);
      var o = this.prevPosition.x - this.position.x,
        e = this.prevPosition.y - this.position.y,
        h = Math.sqrt(o * o + e * e);
      for (
        s = 1, this.prevPosition = new t(this.position.x, this.position.y);
        s < this.particleCount;
        s++
      ) {
        var r = t.Sub(
          this.particles[s - 1].position,
          this.particles[s].position
        );
        r.Normalize(),
          r.Mul((h / i) * this.velocityInherit),
          this.particles[s].AddForce(r);
      }
      for (s = 1; s < this.particleCount; s++) this.particles[s].Integrate(i);
      for (s = 1; s < this.particleCount; s++) {
        var a = new t(
          this.particles[s].position.x,
          this.particles[s].position.y
        );
        a.Sub(this.particles[s - 1].position),
          a.Normalize(),
          a.Mul(this.particleDist),
          a.Add(this.particles[s - 1].position),
          (this.particles[s].position = a);
      }
      this.position.y > n.bounds.y + this.particleDist * this.particleCount &&
        this.Reset();
    }),
      (this.Reset = function () {
        (this.position.y = -Math.random() * n.bounds.y),
          (this.position.x = Math.random() * n.bounds.x),
          (this.prevPosition = new t(this.position.x, this.position.y)),
          (this.velocityInherit = 2 * Math.random() + 4),
          (this.time = 100 * Math.random()),
          (this.oscillationSpeed = 2 * Math.random() + 1.5),
          (this.oscillationDistance = 40 * Math.random() + 40),
          (this.ySpeed = 40 * Math.random() + 80),
          (this.frontColor = "#ffffff"),
          (this.backColor = "#ffffff"),
          (this.particles = []);
        for (var i = 0; i < this.particleCount; i++)
          this.particles[i] = new s(
            this.position.x,
            this.position.y - i * this.particleDist,
            this.particleMass,
            this.particleDrag
          );
      }),
      (this.Draw = function (i) {
        for (var s = 0; s < this.particleCount - 1; s++) {
          var o = new t(
              this.particles[s].position.x + this.xOff,
              this.particles[s].position.y + this.yOff
            ),
            n = new t(
              this.particles[s + 1].position.x + this.xOff,
              this.particles[s + 1].position.y + this.yOff
            );
          0 >
          this.Side(
            this.particles[s].position.x,
            this.particles[s].position.y,
            this.particles[s + 1].position.x,
            this.particles[s + 1].position.y,
            n.x,
            n.y
          )
            ? ((i.fillStyle = this.frontColor),
              (i.strokeStyle = this.frontColor))
            : ((i.fillStyle = this.backColor),
              (i.strokeStyle = this.backColor)),
            0 == s
              ? (i.beginPath(),
                i.moveTo(
                  this.particles[s].position.x,
                  this.particles[s].position.y
                ),
                i.lineTo(
                  this.particles[s + 1].position.x,
                  this.particles[s + 1].position.y
                ),
                i.lineTo(
                  (this.particles[s + 1].position.x + n.x) * 0.5,
                  (this.particles[s + 1].position.y + n.y) * 0.5
                ),
                i.closePath(),
                i.stroke(),
                i.fill(),
                i.beginPath(),
                i.moveTo(n.x, n.y),
                i.lineTo(o.x, o.y),
                i.lineTo(
                  (this.particles[s + 1].position.x + n.x) * 0.5,
                  (this.particles[s + 1].position.y + n.y) * 0.5
                ),
                i.closePath(),
                i.stroke(),
                i.fill())
              : s == this.particleCount - 2
              ? (i.beginPath(),
                i.moveTo(
                  this.particles[s].position.x,
                  this.particles[s].position.y
                ),
                i.lineTo(
                  this.particles[s + 1].position.x,
                  this.particles[s + 1].position.y
                ),
                i.lineTo(
                  (this.particles[s].position.x + o.x) * 0.5,
                  (this.particles[s].position.y + o.y) * 0.5
                ),
                i.closePath(),
                i.stroke(),
                i.fill(),
                i.beginPath(),
                i.moveTo(n.x, n.y),
                i.lineTo(o.x, o.y),
                i.lineTo(
                  (this.particles[s].position.x + o.x) * 0.5,
                  (this.particles[s].position.y + o.y) * 0.5
                ),
                i.closePath(),
                i.stroke(),
                i.fill())
              : (i.beginPath(),
                i.moveTo(
                  this.particles[s].position.x,
                  this.particles[s].position.y
                ),
                i.lineTo(
                  this.particles[s + 1].position.x,
                  this.particles[s + 1].position.y
                ),
                i.lineTo(n.x, n.y),
                i.lineTo(o.x, o.y),
                i.closePath(),
                i.stroke(),
                i.fill());
        }
      }),
      (this.Side = function (i, t, s, o, n, e) {
        return (i - s) * (e - o) - (t - o) * (n - s);
      });
  }
  (t.Lerp = function (i, s, o) {
    return new t((s.x - i.x) * o + i.x, (s.y - i.y) * o + i.y);
  }),
    (t.Distance = function (i, s) {
      return Math.sqrt(t.SqrDistance(i, s));
    }),
    (t.SqrDistance = function (i, t) {
      var s = i.x - t.x,
        o = i.y - t.y;
      return s * s + o * o + z * z;
    }),
    (t.Scale = function (i, s) {
      return new t(i.x * s.x, i.y * s.y);
    }),
    (t.Min = function (i, s) {
      return new t(Math.min(i.x, s.x), Math.min(i.y, s.y));
    }),
    (t.Max = function (i, s) {
      return new t(Math.max(i.x, s.x), Math.max(i.y, s.y));
    }),
    (t.ClampMagnitude = function (i, s) {
      var o = i.Normalized;
      return new t(o.x * s, o.y * s);
    }),
    (t.Sub = function (i, s) {
      return new t(i.x - s.x, i.y - s.y, i.z - s.z);
    }),
    (o.bounds = new t(0, 0)),
    (n.bounds = new t(0, 0)),
    ((e = {}).Context = function (i) {
      var s = 0,
        h = document.getElementById(i),
        r = document.createElement("canvas");
      (r.width = h.offsetWidth), (r.height = h.offsetHeight), h.appendChild(r);
      var a = r.getContext("2d"),
        c = [];
      for (s = 0, n.bounds = new t(r.width, r.height); s < 7; s++)
        c[s] = new n(
          Math.random() * r.width,
          -Math.random() * r.height * 2,
          30,
          8,
          8,
          45,
          1,
          0.05
        );
      var l = [];
      for (s = 0, o.bounds = new t(r.width, r.height); s < 25; s++)
        l[s] = new o(Math.random() * r.width, Math.random() * r.height);
      (this.resize = function () {
        (r.width = h.offsetWidth),
          (r.height = h.offsetHeight),
          (o.bounds = new t(r.width, r.height)),
          (n.bounds = new t(r.width, r.height));
      }),
        (this.start = function () {
          this.stop(),
            (this.interval = setInterval(function () {
              e.update();
            }, 33.333333333333336));
        }),
        (this.stop = function () {
          clearInterval(this.interval);
        }),
        (this.update = function () {
          var i = 0;
          for (a.clearRect(0, 0, r.width, r.height), i = 0; i < 25; i++)
            l[i].Update(0.03333333333333333), l[i].Draw(a);
          for (i = 0; i < 7; i++)
            c[i].Update(0.03333333333333333), c[i].Draw(a);
        });
    });
  var e = new e.Context("confetti");
  e.start(),
    $(window).resize(function () {
      e.resize();
    });
}
