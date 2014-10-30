
cp = {}

cp.notification = function(obj){
    if ('Notification' in window) {
        window.notification = new Notification(obj.title, {
            body: obj.body,
            icon: obj.icon,
            tag: obj.tag,
        });
    }
    if(obj.tag == 'serverDown'){
        try{
            if(window.s.paused || !window.s){
                // window.s = new Audio('Alarm01.wav');
                window.s.play();
            }
        }catch(e){
            window.s = new Audio('Ring03.wav');
        }
    }
}

cp.getData = function(){
    $.post("https://www.numberbazaar.com/recharge/count", {},
        function(data, e, d) {

            if (data.total == 0) {

                // $.post('https://www.numberbazaar.com/recharge/login', {
                //     userid: username,
                //     password: password
                // });

                window.random = window.random || Math.random();
                return false;
                cp.notification({
                    title: 'numberbazaar',
                    body: 'Please login to "www.numberbazaar.com/recharge/dashboardview" to enable recharge notifications.',
                    icon: 'icon.png',
                    tag: window.random
                });


            } else {

                if(data.inque == 0) return false;

                cp.notification({
                    title: 'recharge',
                    body: data.inque+' recharge(s) inqueue.\ntoday: '+data.todaycount,
                    icon: data.inque+'.fw.png',
                    tag: data.inque+''+data.todaycount
                });

            }

        }, 'json').error(function(e, d, f) {

            if(e.status == 0){
                cp.notification({
                    title: 'Cannot connect!',
                    body: 'Cannot connect to the internet, please check your internet connection.',
                    icon: 'icon.png',
                    tag: 'serverDown'
                });

            }else if(e.status == 503){
                cp.notification({
                    title: '503!, the server is facing some problem.',
                    body: 'the server is down boni, the server is down!\nrelax everything will be alright in sometime.',
                    icon: 'icon.png',
                    tag: 'serverDown'
                });

            }else if(e.status == 508){
                cp.notification({
                    title: '508!, Resource limit is reached.',
                    body: 'seems many people are here at once, oh man, !',
                    icon: 'icon.png',
                    tag: 'serverDown'
                });
            }else{
                cp.notification({
                    title: e.status+' error!',
                    body: 'Unfortunately, some error occured while i was working !',
                    icon: 'icon.png',
                    tag: 'serverDown'
                });
            }


        })
};

setInterval(function() {
    cp.getData();
}, 5000);

var sound = function(){

}