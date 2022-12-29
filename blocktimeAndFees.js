/* --------------------------------------------------------------
Author: scalanakamoto
Version: 0.1.0
-------------------------------------------------------------- */

const urlSkeleton             = 'https://mempool.space/api'
const urlPathCurrentBlockTime = `${urlSkeleton}/blocks/tip/height`
const urlMempoolBlocks        = `${urlSkeleton}/v1/fees/mempool-blocks`
const urlIcon                 =
  'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/128/Bitcoin-BTC-icon.png'

const reqCurrentBlockTime = new Request(urlPathCurrentBlockTime);
const currentBlockTime    = await reqCurrentBlockTime.loadString();
const reqMempoolBlocks    = new Request(urlMempoolBlocks);
const mempoolBlock        = await reqMempoolBlocks.loadJSON();
const reqBitcoinIcon      = new Request(urlIcon);
const bitcoinIcon         = await reqBitcoinIcon.loadImage();

const createWidget = (blockTime, mempoolBlock, bitcoinIcon) => {
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

  const medianFeeText     = w.addText('median fee in Sats')
  medianFeeText.textColor = Color.white()
  medianFeeText.font      = Font.boldSystemFont(12)
  medianFeeText.centerAlignText()

  w.addSpacer(8)

  const medianFee     = w.addText(Math.round(mempoolBlock[0].medianFee).toString())
  medianFee.textColor = Color.orange()
  medianFee.font      = Font.systemFont(16)
  medianFee.centerAlignText()

  w.setPadding(0, 0, 0, 0)
  return w
}

// main
const widget = createWidget(currentBlockTime, mempoolBlock, bitcoinIcon)
if (config.runsInWidget) { Script.setWidget(widget); Script.complete() } else { widget.presentSmall() }
