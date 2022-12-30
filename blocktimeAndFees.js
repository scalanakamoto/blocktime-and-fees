/* --------------------------------------------------------------
Idea: DerNodetar
Author: scalanakamoto
Version: 1.0
-------------------------------------------------------------- */

const urlSkeleton         = 'https://mempool.space/api'
const urlCurrentBlockTime = `${urlSkeleton}/blocks/tip/height`
const urlFees             = `${urlSkeleton}/v1/fees/recommended`
const urlIcon             = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/128/Bitcoin-BTC-icon.png'

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
  image.imageSize = new Size(45, 45)
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
    const text = col.addText('     fast   |')
    text.font = Font.mediumSystemFont(12);
    text.textColor = Color.white();
    let fee = col.addText(`      ${fees.fastestFee.toString()}     `)
    fee.textColor = Color.orange();
    fee.font = Font.mediumSystemFont(12);
  }
  {
    const col = feeTextFow.addStack();
    col.layoutVertically();
    const text = col.addText('     eco    |');
    text.font = Font.mediumSystemFont(12);
    text.textColor = Color.white();
    let fee = col.addText(`       ${fees.economyFee.toString()}     `);
    fee.textColor = Color.orange();
    fee.font = Font.mediumSystemFont(12);
  }
  {
    const col = feeTextFow.addStack();
    col.layoutVertically();
    const text = col.addText('   min     ');
    text.font = Font.mediumSystemFont(12);
    text.textColor = Color.white();
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
