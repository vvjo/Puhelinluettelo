(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{13:function(e,n,t){},15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),c=t(14),o=t.n(c),r=t(2),l=function(e){return u.a.createElement("form",null,"filter shown with: ",u.a.createElement("input",{value:e.newFilter,onChange:e.handleFilter}))},i=function(e){return u.a.createElement("ul",null,e.personsToShow.map((function(n){return u.a.createElement("li",null,n.name," ",n.number," ",u.a.createElement("button",{onClick:function(){return e.delete(n.id)}},"delete"))})))},m=function(e){return u.a.createElement("form",{onSubmit:e.addPerson},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.newName,onChange:e.handleNameChange}),u.a.createElement("br",null),"number: ",u.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},s=t(3),f=t.n(s),d="/api/persons",h=function(){return f.a.get(d).then((function(e){return e.data}))},b=function(e){return f.a.post(d,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.className;return null===n?null:u.a.createElement("div",{className:t},n)},w=(t(13),function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),s=Object(r.a)(o,2),f=s[0],d=s[1],w=Object(a.useState)(""),g=Object(r.a)(w,2),j=g[0],O=g[1],N=Object(a.useState)(""),S=Object(r.a)(N,2),C=S[0],T=S[1],k=Object(a.useState)(null),x=Object(r.a)(k,2),y=x[0],F=x[1],P=Object(a.useState)("notification"),A=Object(r.a)(P,2),D=A[0],I=A[1];Object(a.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var J=function(){h().then((function(e){c(e)}))};console.log(t.length);var B=t.some((function(e){return e.name.includes(C)}))?t.filter((function(e){return e.name.includes(C)})):t;return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(v,{message:y,className:D}),u.a.createElement(l,{newFilter:C,handleFilter:function(e){T(e.target.value)}}),u.a.createElement("h2",null,"Add a new"),u.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:f,number:j,key:f};t.some((function(e){return e.name===n.name}))?window.confirm("".concat(n.name," is already added to phonebook. Want to update?"))&&(p(t.findIndex((function(e){return f===e.name}))+1,n).then((function(e){J()})).catch((function(e){I("error"),F("".concat(n.name," doesn't exist in database")),setTimeout((function(){F(null),I("notification"),J()}),5e3)})),F("".concat(n.name," phonenumber updated")),setTimeout((function(){F(null)}),5e3)):b(n).then((function(e){c(t.concat(e)),F("Added ".concat(n.name)),setTimeout((function(){F(null)}),5e3)})),d(""),O("")},newName:f,handleNameChange:function(e){d(e.target.value)},newNumber:j,handleNumberChange:function(e){O(e.target.value)}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement(i,{personsToShow:B,delete:function(e){window.confirm("Delete this person?")&&(c(t.filter((function(n){return n.id!==e}))),E(e).catch((function(e){I("error"),F("This person doesn't exist in database"),setTimeout((function(){I("notification"),J()}),5e3)})),F("".concat(e,". deleted")),setTimeout((function(){F(null)}),5e3))}}))});o.a.render(u.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.bf6c6ec9.chunk.js.map