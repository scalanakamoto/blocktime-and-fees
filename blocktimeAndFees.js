/* --------------------------------------------------------------
Author: scalanakamoto
Version: 0.1.0
-------------------------------------------------------------- */

const urlSkeleton         = 'https://mempool.space/api'
const urlCurrentBlockTime = `${urlSkeleton}/blocks/tip/height`
const urlFees             = `${urlSkeleton}/v1/fees/recommended`
const urlIcon             =
  'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/128/Bitcoin-BTC-icon.png'

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

  const fastestFeeText     = w.addText('median fee in Sats')
  fastestFeeText.textColor = Color.white()
  fastestFeeText.font      = Font.boldSystemFont(12)
  fastestFeeText.centerAlignText()

  const economyFeeText     = w.addText('median fee in Sats')
  economyFeeText.textColor = Color.white()
  economyFeeText.font      = Font.boldSystemFont(12)
  economyFeeText.centerAlignText()

  const minimumFeeText     = w.addText('median fee in Sats')
  minimumFeeText.textColor = Color.white()
  minimumFeeText.font      = Font.boldSystemFont(12)
  minimumFeeText.centerAlignText()

  w.addSpacer(8)

  const fastestFees             = w.addText(fees.fastestFee.toString())
  const economyFee              = w.addText(fees.economyFee.toString())
  const minimumFee              = w.addText(fees.minimumFee.toString())
  fastestFees.textColor         = Color.orange()
  fastestFees.font              = Font.systemFont(16)
  fastestFees.centerAlignText()
  economyFee.textColor          = Color.orange()
  economyFee.font               = Font.systemFont(16)
  economyFee.centerAlignText()
  minimumFee.textColor          = Color.orange()
  minimumFee.font               = Font.systemFont(16)
  minimumFee.centerAlignText()

  w.setPadding(0, 0, 0, 0)
  return w
}

// main
const widget = createWidget(currentBlockTime, currentFees, bitcoinIcon)
if (config.runsInWidget) { Script.setWidget(widget); Script.complete() } else { widget.presentSmall() }
