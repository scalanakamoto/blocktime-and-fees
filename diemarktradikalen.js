/* --------------------------------------------------------------
Idea: DerNodetar
Author: scalanakamoto
Version: 1.0
-------------------------------------------------------------- */

const urlSkeleton         = 'https://mempool.space/api'
const urlCurrentBlockTime = `${urlSkeleton}/blocks/tip/height`
const urlFees             = `${urlSkeleton}/v1/fees/recommended`
const urlIcon             = 'https://i.postimg.cc/nLrnkH0g/Die-Marktradikalen-Logo-Gelb-Weiss.png'

const reqCurrentBlockTime = new Request(urlCurrentBlockTime);
const currentBlockTime    = await reqCurrentBlockTime.loadString();
const reqFees             = new Request(urlFees);
const currentFees         = await reqFees.loadJSON();
const reqBitcoinIcon      = new Request(urlIcon);
const bitcoinIcon         = await reqBitcoinIcon.loadImage();

const createWidget = (blockTime, fees, bitcoinIcon) => {
  const w           = new ListWidget()
  w.backgroundColor = new Color("#000000")
  
  const image     = w.addImage(bitcoinIcon)
  image.imageSize = new Size(80, 25)
  image.centerAlignImage()
  
  w.addSpacer(8)
  
  const blockTimeText     = w.addText("block time")
  blockTimeText.textColor = Color.white()
  blockTimeText.font      = Font.boldSystemFont(12)
  blockTimeText.centerAlignText()
  
  w.addSpacer(8)
  
  const blockTimeValue     = w.addText(blockTime)
  blockTimeValue.textColor = Color.orange()
  blockTimeValue.font      = Font.systemFont(16)
  blockTimeValue.centerAlignText()
  
  w.addSpacer(8)
  
  const feeTextFow = w.addStack();
  feeTextFow.layoutHorizontally();
  feeTextFow.addSpacer(1);
  
  {
    const col = feeTextFow.addStack();
    col.layoutVertically();
    const station = col.addText('     fast   |')
    station.font = Font.mediumSystemFont(12);
    station.textColor = Color.white();
    let fee = col.addText(`      ${fees.fastestFee.toString()}     `)
    fee.textColor = Color.orange();
    fee.font = Font.mediumSystemFont(12);
  }
  {
    const col = feeTextFow.addStack();
    col.layoutVertically();
    const station = col.addText('     eco    |');
    station.font = Font.mediumSystemFont(12);
    station.textColor = Color.white();
    let fee = col.addText(`       ${fees.economyFee.toString()}     `);
    fee.textColor = Color.orange();
    fee.font = Font.mediumSystemFont(12);
  }
  {
    const col = feeTextFow.addStack();
    col.layoutVertically();
    const station = col.addText('   min     ');
    station.font = Font.mediumSystemFont(12);
    station.textColor = Color.white();
    let fee = col.addText(`     ${fees.minimumFee.toString()}      `);
    fee.textColor = Color.orange();
    fee.font = Font.mediumSystemFont(12);
  }
  
  w.setPadding(0, 0, 0, 0)
  return w
}

// main
const widget = createWidget(currentBlockTime, currentFees, bitcoinIcon)
if (config.runsInWidget) { Script.setWidget(widget); Script.complete() } else { widget.presentSmall() }
