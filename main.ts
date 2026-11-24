import{readdirSync,readFileSync,writeFileSync,mkdirSync}from"node:fs";
const S="01146:;?xxxxxxxx999999959995999x999xxxxxxxxxxxxx04400xxxxxxxxxxx58xxxxxxxxxxxxxx4414";
function R(p,q){
 let D=new Int32Array(576),u=new Uint8Array(65536),s=0,g=0,pc=0,n=0,ip=0,l=0,a,b,r,d;
 const z=e=>[u.slice(0,l),e];
 while(n<1e6){
  n++;
  if(pc<0||pc>=p.length)return z(9);
  let o=p[pc],c=S.charCodeAt(o)-48;
  if(!(c<16))return z(5);
  let m=o==1?1:o==2?4:o>47&&o<52?2:0;
  if(pc+m>=p.length)return z(9);
  let v=c>>2,w=c&3;
  if(s<v||s-v+w>256)return z(s<v?2:3);
  pc+=1+m;
  if(o<8){
   if(o==0)return z(0);
   if(o==1)D[s++]=(p[pc-1]<<24)>>24;
   else if(o==2)D[s++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;
   else if(o==3)s--;
   else if(o==4){D[s]=D[s-1];s++;}
   else if(o==5){a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;}
   else if(o==6){D[s]=D[s-2];s++;}
   else{a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;}
  }else if(o<35){
   d=o-16;
   if(d==7)D[s-1]=-D[s-1];
   else if(d==11)D[s-1]=~D[s-1];
   else{a=D[s-2];b=D[s-1];if(!b&&d>2&&d<7)return z(4);r=d==0?a+b|0:d==1?a-b|0:d==2?Math.imul(a,b):d==3?(a/b)|0:d==4?a%b|0:d==5?(a>>>0)/(b>>>0)|0:d==6?(a>>>0)%(b>>>0)|0:d==8?a&b:d==9?a|b:d==10?a^b:d==12?a<<b:d==13?a>>b:d==14?(a>>>b)|0:d==16?a==b?1:0:d==17?a<b?1:0:(a>>>0)<(b>>>0)?1:0;s-=2;D[s++]=r;}
  }else if(o<53){
   let k=p[pc-2]|p[pc-1]<<8,j=(k<<16)>>16;
   if(o==48)pc+=j;
   else if(o==51){if(g==64)return z(7);D[256+g++]=pc;pc=k;}
   else if(o==52){if(!g)return z(8);pc=D[256+--g];}
   else{b=D[--s];if((o==49)==(b==0))pc+=j;}
  }else if(o==64){a=D[s-1];if(a<0||a>255)return z(6);D[s-1]=D[320+a];}
  else if(o==65){a=D[s-1];b=D[s-2];if(a<0||a>255)return z(6);s-=2;D[320+a]=b;}
  else if(o==80){let t=""+D[s-1];if(l+t.length>65536)return z(11);s--;for(let k=0;k<t.length;k++)u[l++]=t.charCodeAt(k);}
  else if(o==81){if(l+1>65536)return z(11);u[l++]=D[--s]&255;}
  else if(o==82)D[s++]=ip<q.length?q[ip++]:-1;
  else return z(D[--s]&255);
 }
 return z(10);
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const id of readdirSync(I)){
 let r=R(readFileSync(I+"/"+id+"/program.bin"),readFileSync(I+"/"+id+"/input.bin"));
 mkdirSync(O+"/"+id,{recursive:!0});
 writeFileSync(O+"/"+id+"/stdout.bin",r[0]);
 writeFileSync(O+"/"+id+"/exit.txt",r[1]+"\n");
}
