function observe(data) {
	if (!data || typeof data !== 'object') {
		return;
	}
	Object.keys(data).forEach(function(key) {
		console.log('data, key, data[key]====', data, key, data[key])
		defineReactive(data, key, data[key]);
	});
}

function defineReactive(data, key, val) {
	observe(val)
	var dep = new Dep();
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get:function(){
			if(Dep.target){ // 判断是否需要添加订阅者
				dep.addSub(Dep.target); // 在这里添加一个订阅者
			}
			return val;
		},
		set:function(newVal){
			if(val===newVal){
				return
			}
			val = newVal;
			console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
			dep.notify();// 如果数据变化，通知所有订阅者
		}
	})
}

function Dep() {
	this.subs = [];
}
Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},
	notify: function() {
		this.subs.forEach((sub) => {
			sub.update()
		})
	}
}
