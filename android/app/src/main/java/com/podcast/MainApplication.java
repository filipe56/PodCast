package com.podcast;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.audioStreaming.ReactNativeAudioStreamingPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RNScreensPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNCMaskedViewPackage(),
            new RNFetchBlobPackage(),
            new RNScreensPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNCMaskedViewPackage(),
            new VectorIconsPackage(),
            new ReactNativeAudioStreamingPackage(),
            new ReactVideoPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
