//
//  AppDelegate.h
//  Tracker
//
//  Created by Abe Fettig on 11/8/11.
//  Copyright (c) 2011 Sleeper Industries, LLC. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate>

@property (assign) IBOutlet NSWindow *window;
@property (weak) IBOutlet WebView *webView;

@end
