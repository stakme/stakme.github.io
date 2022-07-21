---
title: charts_flutter Gallery as a Web App
tags: [flutter, eng]
published_at: 2022-07-21T16:24:32+09:00[Asia/Tokyo]
---

![@example gallery](gallery.png "Unfortunately too heavy site")

I wanted it, so I created [it here](https://stak.me/google_charts/) :)

All examples originate from their official [`charts_flutter/example`](https://github.com/google/charts/tree/master/charts_flutter/example) directory. But I added [some fixs (or workarounds)](https://github.com/google/charts/commit/a441c996058fc3636fc92fd337134026a9e11104) to them.

### error_01

I had an error log like this:

```
"Error: Assertion failed: file:///Users/stakme/.local/opt/flutter/packages/flutter/lib/src/rendering/box.dart:1979:12
hasSize
"RenderBox was not laid out: RenderSemanticsGestureHandler#fd5a0"
```

I can avoid this error by specifying the generics type like `charts.PieChart<String>`.

The reason is not clear for me a flutter newbee ¯\_(ツ)_/¯

### error_02

Other error message is:

```
Error: Cannot hit test a render box that has never been laid out.
The hitTest() method was called on this RenderBox: RenderErrorBox#b69be NEEDS-LAYOUT NEEDS-PAINT:
  creator: ErrorWidget-[#f085a] ← RawGestureDetector ← GestureDetector ← LayoutId-[<chartContainer>] ← CustomMultiChildLayout ← ScatterPlotChart ← ShapesScatterPlotChart ← AspectRatio ← RepaintBoundary ← IndexedSemantics ← NotificationListener<KeepAliveNotification> ← KeepAlive ← ⋯
  parentData: offset=Offset(0.0, 0.0); id=chartContainer
  constraints: MISSING
  size: MISSING
Unfortunately, this object's geometry is not known at this time, probably because it has never been laid out. This means it cannot be accurately hit-tested.
If you are trying to perform a hit test during the layout phase itself, make sure you only hit test nodes that have completed layout (e.g. the node's children, after their layout() method has been called).
```

Callback function for [`charts.pointSymbolRendererFnKey`](https://github.com/google/charts/blob/26b73c62ae33d481f38a1f0c65f30f5e0c998126/charts_common/lib/src/chart/scatter_plot/point_renderer.dart#L45-L46) seems to cause this error.

The example code is [`String Function(int index)`](https://github.com/google/charts/blob/d6adb193ff91d2042941bad388845cbc8c5cd964/charts_flutter/example/lib/scatter_plot_chart/shapes.dart#L187-L188) but the expected one is [`String Function(int? index)`](https://github.com/google/charts/blob/26b73c62ae33d481f38a1f0c65f30f5e0c998126/charts_common/lib/src/data/series.dart#L263-L270). So I fix like this.

```
..setAttribute(charts.pointSymbolRendererFnKey, (int? index) {
  if (index == null) {
    return "rect";
  }
    return data[index].shape ?? "rect";
  })
```

No error is happening with this.
