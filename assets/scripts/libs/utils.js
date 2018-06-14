var utils = {
    dump:function(obj)
    {
        console.log("utils.dump start");
        for(var k in obj)
            console.log("{0}:{1}".format(k, obj[k]));
        console.log("utils.dump end");
    },

    simpleClone:function(src)
    {
        var dst = {};
        cc.js.addon(dst, src);
        return dst;
    },

    exitGame:function(url)
    {
        if(cc.sys.isNative)
        {
            if(cc.sys.os == cc.sys.OS_IOS)
            {
                jsb.reflection.callStaticMethod("AppController", "exitGame");
            }
            else
            {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "exitGame", "()V");
            }
        }
        else
        {
            if(url != undefined && cc.js.isString(url))
                location.replace(url);
            else
                location.reload();
        }
    },

    formatD:function(count, num)
    {
        var str = num.toString();
        var strLen = str.length;
        while(count > strLen)
        {
            str = "0" + str;
            count--;
        }
        return str;
    },

    getUrlParams:function()
    {
        if(!cc.sys.isBrowser)
            return {};

        if(this.urlParams == null)
        {
            this.urlParams = {};
            var url = window.location.href;
            var tmp = url.split("?");
            if(tmp.length > 1)
            {
                tmp = tmp[1].split("&");
                for(var i = 0; i < tmp.length; ++i)
                {
                    var param = tmp[i].split("=");
                    this.urlParams [param[0]] = param[1];
                }
            }
        }
        return this.urlParams;
    },

    randomInt : function(min, max)
    {
        return Math.floor(min + Math.random() * (max - min + 1));
    },

    random:function(min, max)
    {
        return min + Math.random() * (max - min)
    },

    md5:function(string)
    {
        function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x,y,z) { return (x & y) | ((~x) & z); }
        function G(x,y,z) { return (x & z) | (y & (~z)); }
        function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }

        function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

        return temp.toLowerCase();
    },

    loadTxtSync:function(path)
    {
        if(cc.sys.isBrowser)
        {
            return cc.loader.getRes(path);
        }
        else
        {
            return jsb.fileUtils.getStringFromFile(cc.path.join(cc.loader.resPath, path));
        }
    },

    splitNumber : function(number)
    {
        var str = number.toString();
        var sign = str.charAt(0);
        if(sign == "-" || sign == "+")
        {
            str = str.substr(1);
        }
        else
        {
            sign = "";
        }

        var tmp = str.split(".");
        if(tmp.length > 1)
        {
            tmp[0] = utils.splitNumber(tmp[0]);
            return sign + tmp.join(".");
        }
        else
        {
            tmp = [];
            while(str.length > 3)
            {
                tmp.unshift(str.substr(str.length - 3));
                str = str.substr(0, str.length - 3);
            }
            tmp.unshift(str);

            str = tmp.join(",");
            str = sign + str;
            return str;
        }
    },

    stringRepeat : function(src, count)
    {
        var ret = src;
        while(count > 1)
        {
            --count;
            ret += src;
        }
        return ret;
    },
};

var AnimationNodePool = cc.Class({
    extends : cc.NodePool,
    init:function(data)
    {
        this.data = data;
    },

    get:function()
    {
        if(this.size() > 0)
        {
            return cc.NodePool.prototype.get.call(this);
        }

        return utils.ui.createFrameAnimationNode(this.data);
    }
});

utils.ui = {
    createFrameAnimationNode:function(data)
    {
        var spriteFrames = null;
        if(data.pattern)
        {
            spriteFrames = this.getSpriteFrames(data.atlas, data.pattern, data.idxStart, data.idxEnd);
        }
        else
        {
            var atlas = cc.loader.getRes(data.atlas, cc.SpriteAtlas);
            spriteFrames = atlas.getSpriteFrames();
        }

        if(data.idxFrameStart != null && data.idxFrameStart >= 0 && data.idxFrameStart < spriteFrames.length)
        {
            spriteFrames = spriteFrames.slice(data.idxFrameStart).concat(spriteFrames.slice(0, data.idxFrameStart));
        }

        var node = new cc.Node();
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = spriteFrames[0];

        var animation = node.addComponent(cc.Animation);
        var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, data.fps);
        clip.name = data.clipName || 'anim';


        animation.addClip(clip);

        if(data.loop)
        {
            clip.wrapMode = cc.WrapMode.Loop;
            animation.play(clip.name);
        }
        else if(data.once)
        {
            animation.play(clip.name);
            var removeSelf = function()
            {
                node.parent = null;
                animation.off("finished", removeSelf);
            };
            animation.on("finished", removeSelf);
        }
        // else if(data.finishedListener != null)
        // {
        //     animation
        // }

        return node;
    },

    addOutline:function(node, color, width)
    {
        if(node instanceof cc.Label)
            node = node.node;

        if(node.getComponent(cc.Label) == null)
        {
            console.error("utils.ui.addOutline:is not label component");
            return;
        }

        var labelOutline = node.addComponent(cc.LabelOutline);
        labelOutline.color = color;
        labelOutline.width = width;
    },


    getSpriteFrame:function(frameName, atlasName)
    {
        if(atlasName == null)
        {
            var spriteFrame = new cc.SpriteFrame();
            spriteFrame.setTexture(cc.loader.getRes(frameName))
            return spriteFrame;
        }

        var atlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        return atlas.getSpriteFrame(frameName);
    },

    createSpriteNode:function(frameName, atlasName)
    {
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.getSpriteFrame(frameName, atlasName);
        return node;
    },

    setSpriteFrame:function(node, frameName, atlasName)
    {
        var sprite = node.getComponent(cc.Sprite);
        var frame = this.getSpriteFrame(frameName, atlasName);
        if(frame == null)
        {
            console.log("setSpriteFrame:\"{0}\"--\"{1}\" no exist!".format(atlasName, frameName));
            return;
        }
        sprite.spriteFrame = frame;
    },

    createPrefab:function(prefabPath)
    {
        return cc.instantiate(cc.loader.getRes(prefabPath, cc.Prefab));
    },

    getSpriteFrames:function(atlasName, pattern, startIdx, endIdx)
    {
        var atlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        if(pattern == null)
            return atlas.getSpriteFrames();

        var frames = [];
        for(var idx = startIdx; idx <= endIdx; ++idx)
        {
            var str = utils.formatD(4, idx);
            var frameName = pattern.format(str);
            var frame = atlas.getSpriteFrame(frameName);
            if(frame == null)
                console.log("##############frame no exist, name:" + frameName + ",in atlas:" + atlasName);
            frames.push(frame);
        }

        return frames;
    },

    createAnimationNodePool:function(data)
    {
        var pool = new AnimationNodePool();
        pool.init(data);
        return pool;
    },

    scaleClickRegion:function(btn, cb, rectRate)
    {
        var img = btn.node;
        btn.interactable = false;
        var trigger = cc.instantiate(img);
        trigger.setPosition(0, 0);
        trigger.scale = rectRate || 0.8;
        trigger.opacity = 1;
        trigger.parent = img;

        var zoomScale = btn.zoomScale;
        var duration = btn.duration;

        img.trigger = trigger;
        var saOverCB = function()
        {
            img.scaleState = 0;
        };

        var onTouchStart = function()
        {
            if(img.scaleState != 1 && img.scale < zoomScale)
            {
                img.stopAllActions();
                img.scaleState = 1;
                img.runAction(cc.sequence(cc.scaleTo(duration, zoomScale), cc.callFunc(saOverCB)));
            }
        };

        var onTouchEnd = function()
        {
            if(img.scaleState != -1 && img.scale > 1)
            {
                img.stopAllActions();
                img.scaleState = -1;
                img.runAction(cc.sequence(cc.scaleTo(duration, 1), cc.callFunc(saOverCB)));
            }
            if(cb != null)
                cb();
        };

        var onTouchCancel = function()
        {
            if(img.scaleState != -1 && img.scale > 1)
            {
                img.stopAllActions();
                img.scaleState = -1;
                img.runAction(cc.sequence(cc.scaleTo(duration, 1), cc.callFunc(saOverCB)));
            }
        };

        trigger.on(cc.Node.EventType.TOUCH_START, onTouchStart);
        trigger.on(cc.Node.EventType.TOUCH_END, onTouchEnd);
        trigger.on(cc.Node.EventType.TOUCH_CANCEL, onTouchCancel);
    }
};

utils.event = {
    on:function(evtType, listener, target)
    {
        var node = cc.director.getScene();
        if(cc.isValid(node))
            node.on(evtType, listener, target);
    },

    off:function(evtType, listener, target)
    {
        var node = cc.director.getScene();
        if(cc.isValid(node))
            node.off(evtType, listener, target);
    },

    emit:function(evtType, data)
    {
        var node = cc.director.getScene();
        if(cc.isValid(node))
            node.emit(evtType, data);
    }
};

/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }

    var data = arguments; // 如果模板参数是数组
    // if (arguments.length == 1 && typeof (args) == "object") {
    //     // 如果模板参数是对象
    //     data = args;
    // }

    for(var key in data)
    {
        var value = data[key];
        if(value != null)
            result = result.replaceAll("\\{" + key + "\\}", value);
    }
    return result;
};

Array.prototype.removeElement = function(ele)
{
    var idx = this.indexOf(ele);
    if (idx == -1)
        return;

    return this.splice(idx, 1);
};

cc.pRotate = function (v1, v2) {
    return cc.p(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x);
};

cc.pUnrotate = function (v1, v2) {
    return cc.p(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y);
};

window.utils = utils;
module.exports = utils;
