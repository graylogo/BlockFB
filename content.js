// content.js - 屏蔽视频解析元素和会员广告

function hideElements() {
  // 隐藏视频解析section和相关元素
  const videoSections = document.querySelectorAll(".result-common-section");
  videoSections.forEach(function (section) {
    // 检查是否为视频解析section
    if (
      section.id.startsWith("section-video-") ||
      section.querySelector("app-solution-video") ||
      section.textContent.includes("解析视频")
    ) {
      section.style.display = "none";
      section.style.visibility = "hidden";
      section.style.opacity = "0";
      section.remove(); // 彻底移除元素
    }
  });

  // 隐藏app-solution-video元素
  const videoElements = document.querySelectorAll("app-solution-video");
  videoElements.forEach(function (element) {
    element.style.display = "none";
    element.style.visibility = "hidden";
    element.style.opacity = "0";
    element.remove(); // 彻底移除元素
  });

  // 隐藏会员相关元素
  const memberElements = document.querySelectorAll(
    ".member-container, .member-label, .member-content, .member-title-container, .member-title, .member-detail, .member-btn, .member-title-text, .vip-container, .vip-label",
  );
  memberElements.forEach(function (element) {
    element.style.display = "none";
    element.style.visibility = "hidden";
    element.style.opacity = "0";
    element.remove(); // 彻底移除元素
  });

  // 隐藏包含"粉笔 职测 会员"文本的元素
  const vipTextElements = document.querySelectorAll("div, span, p, section");
  vipTextElements.forEach(function (element) {
    if (
      element.textContent.includes("粉笔 职测 会员") &&
      (element.offsetHeight > 0 || element.offsetWidth > 0)
    ) {
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.opacity = "0";
      element.remove(); // 彻底移除元素
    }
  });
}

// 添加可靠的页面加载检测函数
function waitForPageLoad() {
  if (document.readyState === "complete") {
    hideElements();
  } else if (document.readyState === "interactive") {
    hideElements();
  } else {
    window.addEventListener("load", function () {
      hideElements();
    });
  }
}

// 只在目标页面执行广告屏蔽逻辑
function shouldExecuteBlocking() {
  const currentUrl = window.location.href;
  return currentUrl.includes("spa.fenbi.com/ti/exam/solution/");
}

// 执行页面加载检测
if (shouldExecuteBlocking()) {
  waitForPageLoad();
}

// 使用requestAnimationFrame确保在渲染帧中执行，添加节流机制
let hideScheduled = false;
function scheduleHide() {
  if (!hideScheduled && shouldExecuteBlocking()) {
    hideScheduled = true;
    requestAnimationFrame(function () {
      hideElements();
      hideScheduled = false;
    });
  }
}

// 监听各种页面事件
document.addEventListener("DOMContentLoaded", function () {
  scheduleHide();
});
window.addEventListener("load", function () {
  scheduleHide();
});
document.addEventListener("readystatechange", function () {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    scheduleHide();
  }
});

// 监听页面可见性变化
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    scheduleHide();
  }
});

// 监听Angular路由变化（如果存在）
window.addEventListener("popstate", function () {
  scheduleHide();
});
window.addEventListener("hashchange", function () {
  scheduleHide();
});

// 监听History API变化（SPA应用常用）
(function (originalPushState, originalReplaceState) {
  window.history.pushState = function () {
    const result = originalPushState.apply(window.history, arguments);
    scheduleHide();
    return result;
  };

  window.history.replaceState = function () {
    const result = originalReplaceState.apply(window.history, arguments);
    scheduleHide();
    return result;
  };
})(window.history.pushState, window.history.replaceState);

// 监听可能的Angular路由变化事件
document.addEventListener("angular-route-change", function () {
  scheduleHide();
});
document.addEventListener("router-change-start", function () {
  scheduleHide();
});
document.addEventListener("router-change-end", function () {
  scheduleHide();
});

// 监听可能的Angular NavigationEnd事件（通过事件冒泡）
document.addEventListener("click", function (e) {
  // 检查是否点击了导航链接
  const link = e.target.closest("a");
  if (link && link.href && link.href.includes("spa.fenbi.com")) {
    // 延迟执行，确保路由已经切换
    setTimeout(scheduleHide, 500);
    setTimeout(scheduleHide, 1000);
    setTimeout(scheduleHide, 2000);
  }
});

// 监听页面滚动事件，某些页面可能在滚动时加载内容
document.addEventListener(
  "scroll",
  function () {
    // 节流处理，每500ms执行一次
    scheduleHide();
  },
  { passive: true },
);

// 监听可能的Angular组件加载完成事件
document.addEventListener("angular-component-loaded", function () {
  scheduleHide();
});

// 监听可能的自定义事件
document.addEventListener("solution-loaded", function () {
  scheduleHide();
});

// 使用MutationObserver监听DOM变化，优化配置
let observer;
if (shouldExecuteBlocking()) {
  observer = new MutationObserver(function (mutations) {
    scheduleHide();
  });

  // 开始观察，扩大观察范围和事件类型
  const observerConfig = {
    childList: true, // 监听子节点变化
    subtree: true, // 监听整个DOM树
    attributes: true, // 监听属性变化
    attributeFilter: ["class", "style", "id", "src", "href"], // 监听更多属性
    characterData: true, // 监听文本内容变化
    characterDataOldValue: false, // 不需要旧值
  };

  if (document.body) {
    observer.observe(document.body, observerConfig);
  } else {
    // 如果body还不存在，监听document变化
    const docObserver = new MutationObserver(function () {
      if (document.body) {
        docObserver.disconnect();
        observer.observe(document.body, observerConfig);
        scheduleHide();
      }
    });
    docObserver.observe(document, { childList: true, subtree: true });
  }
}

// 使用更智能的定时器检查机制
if (shouldExecuteBlocking()) {
  let checkCount = 0;
  
  // 初始阶段：每500ms检查一次，持续30秒（60次）
  const initialCheck = setInterval(function () {
    if (!shouldExecuteBlocking()) {
      clearInterval(initialCheck);
      return;
    }
    
    checkCount++;
    scheduleHide();
    
    if (checkCount >= 60) {
      clearInterval(initialCheck);
      
      // 中期阶段：每2秒检查一次，持续5分钟
      const midCheck = setInterval(function () {
        if (!shouldExecuteBlocking()) {
          clearInterval(midCheck);
          return;
        }
        scheduleHide();
      }, 2000);
      
      setTimeout(function () {
        if (shouldExecuteBlocking()) {
          clearInterval(midCheck);
          
          // 后期阶段：每10秒检查一次，持续20分钟
          const lateCheck = setInterval(function () {
            if (!shouldExecuteBlocking()) {
              clearInterval(lateCheck);
              return;
            }
            scheduleHide();
          }, 10000);
          
          setTimeout(function () {
            if (shouldExecuteBlocking()) {
              clearInterval(lateCheck);
            }
          }, 1200000); // 20分钟
        }
      }, 300000); // 5分钟
    }
  }, 500);
}

// 添加页面加载完成后的额外检查
window.addEventListener("load", function () {
  if (shouldExecuteBlocking()) {
    // 页面加载完成后，延迟执行几次检查，确保所有动态内容都已加载
    setTimeout(scheduleHide, 1000);
    setTimeout(scheduleHide, 3000);
    setTimeout(scheduleHide, 5000);
  }
});

// 添加错误处理
window.addEventListener("error", function (e) {
  // 错误可能导致某些元素未正确加载，重新执行检查
  scheduleHide();
});

// 添加未处理的Promise拒绝处理
window.addEventListener("unhandledrejection", function (e) {
  // 尝试恢复执行
  setTimeout(scheduleHide, 1000);
});

// 定期检查插件状态，确保持续工作
setInterval(function () {
  scheduleHide();
}, 30000);
