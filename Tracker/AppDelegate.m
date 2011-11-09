//
//  AppDelegate.m
//  Tracker
//
//  Created by Abe Fettig on 11/8/11.
//  Copyright (c) 2011 Sleeper Industries, LLC. All rights reserved.
//

#import "AppDelegate.h"
#import <WebKit/WebKit.h>

@implementation AppDelegate

@synthesize window = _window;
@synthesize webView = _webView;

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    // Enable full screen.
    [self.window setCollectionBehavior:NSWindowCollectionBehaviorFullScreenPrimary];
    
    
    // Insert code here to initialize your application
//    [[self.webView mainFrame] loadHTMLString:@"Loading..." baseURL:[NSURL fileURLWithPath:@"/"]];
    NSString *path =[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"];
    NSURL *url = [NSURL fileURLWithPath:path];
    NSURLRequest *req = [NSURLRequest requestWithURL:url];
    [[self.webView mainFrame] loadRequest:req];
}

@end
