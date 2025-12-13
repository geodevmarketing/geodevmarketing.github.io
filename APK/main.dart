import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Permission.camera.request();
  await Permission.photos.request();
  await Permission.microphone.request(); // If microphone permission is needed
  await Permission.location.request(); // Request location permission if needed

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: WebViewApp(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class WebViewApp extends StatefulWidget {
  const WebViewApp({Key? key}) : super(key: key);

  @override
  State<WebViewApp> createState() => _WebViewAppState();
}

class _WebViewAppState extends State<WebViewApp> {
  bool _loading = true;
  bool _hasError = false;
  late InAppWebViewController _webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        toolbarHeight: 0.1,
      ),
      body: Stack(
        children: [
          if (_hasError)
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Error loading page.',
                    style: TextStyle(fontSize: 16.0),
                  ),
                  const SizedBox(height: 16.0),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _hasError = false;
                        _loading = true;
                      });
                    },
                    child: const Text('Retry'),
                  ),
                ],
              ),
            ),
          if (!_hasError)
            InAppWebView(
              initialUrlRequest: URLRequest(
                url: Uri.parse('https://geodevmarketing.github.io'),
              ),
              initialOptions: InAppWebViewGroupOptions(
                android: AndroidInAppWebViewOptions(
                  useWideViewPort: true,
                  geolocationEnabled: true,
                  mixedContentMode: AndroidMixedContentMode
                      .MIXED_CONTENT_ALWAYS_ALLOW, // Allow mixed content
                ),
                ios: IOSInAppWebViewOptions(
                  allowsInlineMediaPlayback: true,
                  allowsLinkPreview: true,
                ),
              ),
              onWebViewCreated: (controller) {
                _webViewController = controller;
              },
              androidOnGeolocationPermissionsShowPrompt:
                  (InAppWebViewController controller, String origin) async {
                return GeolocationPermissionShowPromptResponse(
                  origin: origin,
                  allow: true,
                  retain: true,
                );
              },
              androidOnPermissionRequest: (InAppWebViewController controller,
                  String origin, List<String> resources) async {
                return PermissionRequestResponse(
                  resources: resources,
                  action: PermissionRequestResponseAction.GRANT,
                );
              },
              // androidOnShowFileChooser: (InAppWebViewController controller,
              //     FileChooserParams fileChooserParams) async {
              //   // Handle file chooser
              //   return null; // Return the selected file paths here if needed
              // },
              onLoadStart: (controller, url) {
                setState(() {
                  _loading = true;
                });
              },
              onLoadStop: (controller, url) async {
                setState(() {
                  _loading = false;
                });
              },
              onLoadError: (controller, url, code, message) {
                setState(() {
                  _hasError = true;
                });
              },
            ),
          if (_loading)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}