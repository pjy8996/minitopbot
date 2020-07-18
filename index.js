const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = ":hand_splayed:환양합니다";
const byeChannelName = "안녕히가세";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '!도움' }, s0tatus: 'online' })

  let state_list = ['!도움','정상작동','minitop YouTuBe','환영합니다']
  let state_list_index = 1;
  let change_delay = 5000; //1000이 1초

  function changeState() {
    setTimeout(() => {
      console.log( '상태 변경 -> ', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  changeState();
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "게스트"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;
  if(message.content == '!트위치') {
    return message.reply('https://www.twitch.tv/minltop');
  }
  if(message.content == '!유튜브') {
    return message.reply('https://www.youtube.com/channel/UCzcyni64oA9dNfyHKNNvkAA');
  }
  if(message.content == '!index') {
    return message.reply('난 쫄보가 맞아!');
  }

  if(message.content == '!system') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/725354694871875604/728138755298295838/minitop.png';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#186de6')
    embed.setAuthor('minitop BOT 시스템 사용량', img)
    embed.setFooter(`minitop BOT`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  if(message.content == '!민탑') {
    let img = 'https://cdn.discordapp.com/attachments/725354694871875604/728138755298295838/minitop.png';
    let embed = new Discord.RichEmbed()
      .setTitle('MINITOP')
      .setURL('https://cdn.discordapp.com/attachments/725354694871875604/728138755298295838/minitop.png')
      .setAuthor(message.author.username, message.author.avatarURL) 
      .setDescription('minitop official')
      .setThumbnail(img)
      .addBlankField()
      .addField('유튜브', '[유튜브 링크 (클릭)](<https://www.youtube.com/channel/UCzcyni64oA9dNfyHKNNvkAA>)\n', false)
      .addField('트위치', '[트위치 링크 (클릭)](<https://www.twitch.tv/minltop>)\n', false)
      .addField('디스코드', '[디스코드 링크 (클릭)](<https://discord.com/invite/VmcS8tT>)\n', false)
      .addBlankField()
      .setTimestamp()
      .setFooter('MINITOP DISCORD BOT', img)
  }
      if(message.content == '!신청') {
        let embed = new Discord.RichEmbed()
        let img = 'https://cdn.discordapp.com/attachments/725354694871875604/728138755298295838/minitop.png';
        var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
        embed.setColor('#186de6')
        embed.setAuthor('minitop 매니져 신청 현황', img)
        embed.setFooter(`minitop BOT`)
        embed.addBlankField()
        embed.addField('ZENON',    `ZENON#0725`, true);
        embed.addField('곰용', `𝕲𝖔𝖒𝖄𝖔𝖓𝖌#7777`, true);
        embed.addField('独島は韓国の領土',         `独島は韓国の領土#1070`, true);
        embed.addField('넹기분굿',       `넹기분굿#3113`, true);
        embed.addField('[NTF]갓 서니]',   `[NTF]갓 서니]#4846`, true);
        embed.addField('Draft',         `죄송합니다#7768`, true);
        

    message.channel.send(embed)
  } else if(message.content == '!도움') {
    let helpImg = 'https://cdn.discordapp.com/attachments/725354694871875604/728138755298295838/minitop.png';
    let commandList = [
      {name: '!청소', desc: '텍스트 지움'},
      {name: '!유튜브', desc: '미니탑 유튜브 링크'},
      {name: '!트위치', desc: '미니탑 트위치 링크'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('MINITOP BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`MINITOP BOT`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드2') {
    client.guilds.array().forEach(x => {
      x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    });
  } else if(message.content == '!초대코드') {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('!전체공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('MINITOP BOT')
        .setColor('#186de6')
        .setFooter(`MINITOP BOT`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("> **청소명령어 에러**\n>**1부터 99까지의 숫자만 입력해주세요.**")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

client.login(token);