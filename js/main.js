	function PomodoroClickWidget(){
		this.set();	
	}

	PomodoroClickWidget.prototype.set = function(){
		this.isStop = true;
		this.breakLength = 5
		this.sessioLength = 25
		this.time = new Date(1000*60*this.sessioLength);
		this.startTime = new Date(1000*60*this.sessioLength);


		this.timeViewer =  document.querySelector('.time');

		this.bg =  document.querySelector('.time-bg');

		this.intervatID;

		document.querySelector('.timer')
			.addEventListener('click', this._startStopHendler.bind(this), false);
		
		document.querySelector('.break-controls')
			.addEventListener('click',function(event){this._chengBreakLength(event)}.bind(this), false);
		
		document.querySelector('.session-controls')
			.addEventListener('click',function(event){this._chengSessioLength(event)}.bind(this), false);

		document.querySelector('.reset')
			.addEventListener('click',function(){this.set()}.bind(this), false);

		document.querySelector('.break-controls>.count').innerText = this.breakLength;
		document.querySelector('.session-controls>.count').innerText = this.sessioLength;

		this.timeViewer.innerText=this.sessioLength;
	}

	PomodoroClickWidget.prototype._chengBreakLength = function(event){
		if(!this.isStop) return
		var target = event.target;
		var counter	= target.parentNode.querySelector('.count');
		if(target.classList.contains('decriment') && this.breakLength>1){
			this.breakLength--;			
		}else if(target.classList.contains('incriment') && this.breakLength<25){
			this.breakLength++;			
		}
		counter.innerText = this.breakLength;
	}

	PomodoroClickWidget.prototype._chengSessioLength = function(event){
		if(!this.isStop) return
		var target = event.target;
		var counter	= target.parentNode.querySelector('.count');
		if(target.classList.contains('decriment') && this.sessioLength>1){
			this.sessioLength--;			
		}else if(target.classList.contains('incriment') && this.sessioLength<59){
			this.sessioLength++;			
		}
		counter.innerText = this.sessioLength;
		this.timeViewer.innerText=this.sessioLength;
		this.time = new Date(1000*60*this.sessioLength);
	}


	PomodoroClickWidget.prototype._startStopHendler = function(){
		if(this.isStop){
			this.isStop = false;
			console.log('started');
			this.start(this.startBreak);
		}else{
			this.isStop = true;
			console.log('stoped');
			this.stop();
		}
	}

	PomodoroClickWidget.prototype.startSession =function(){
		this.time = new Date(1000*60*this.sessioLength);
		this.startTime = new Date(1000*60*this.sessioLength);
		this.bg.style.backgroundColor = "red";
		document.querySelector('.text').innerText='Session';
		this.start(this.startBreak);
	}

	PomodoroClickWidget.prototype.startBreak = function(){
		this.time = new Date(1000*60*this.breakLength);
		this.startTime = new Date(1000*60*this.breakLength);
		this.bg.style.backgroundColor = "#45e570";
		document.querySelector('.text').innerText='Break';
		this.start('click', this.startSession, false);		
	}

	PomodoroClickWidget.prototype.start = function(collback){
		var _this= this;
		this.startTime = new Date(1000*60*this.sessioLength);
		this.time=new Date(this.time-1000);		
		this.timeViewer.innerText = this.time.getMinutes()+':'+this.time.getSeconds();
		this.intervatID = setInterval(function(){
			_this.time=new Date(_this.time-1000);
			_this.bg.style.height = (1-(_this.time/_this.startTime))*100+'%';
			console.log("t :"+_this.time/_this.startTime);
			console.log(_this.time-1);
			console.log(_this.startTime-1);
			_this.timeViewer.innerText = _this.time.getMinutes()+':'+_this.time.getSeconds();
			if(_this.time.getMinutes()==0 && _this.time.getSeconds()==0){				
				clearInterval(_this.intervatID);
				collback.call(_this);				
			} 
		}, 1000);
	}

	PomodoroClickWidget.prototype.stop = function(){
		clearInterval(this.intervatID);
	}

	var tmp =  new PomodoroClickWidget();