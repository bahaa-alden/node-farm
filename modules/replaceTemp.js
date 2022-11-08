module.exports = (tep, pro) => {
  let output = (tep = tep.replace(/{%image%}/g, pro.image));
  output = output.replace(/{%pro_name%}/g, pro.productName);
  output = output.replace(/{%pro_from%}/g, pro.from);
  output = output.replace(/{%desc%}/g, pro.description);
  output = output.replace(/{%pro_nutrients%}/g, pro.nutrients);
  output = output.replace(/{%quantity%}/g, pro.quantity);
  output = output.replace(/{%price%}/g, pro.price);
  output = output.replace(/{%ID%}/g, pro.id-1);
  if (!pro.organic) output = output.replace("{%not%}", "not-organic");
  return output;
};
