import React from "react";
import { X, Bell } from "lucide-react";

export interface AnnouncementData {
    title: string;
    body: string;
    image?: string;
    displayType: "banner" | "modal" | "popup" | "notification";
    styling: {
        backgroundColor: string;
        textColor: string;
        fontSize: "sm" | "md" | "lg";
        alignment: "left" | "center" | "right";
    };
}

interface TemplateProps extends AnnouncementData {
    onClose?: () => void;
}

export const BannerTemplate: React.FC<TemplateProps> = ({
    title,
    body,
    image,
    styling,
    onClose,
}) => {
    const style: React.CSSProperties = {
        backgroundColor: styling.backgroundColor,
        color: styling.textColor,
        textAlign: styling.alignment,
        fontSize:
            styling.fontSize === "sm"
                ? "14px"
                : styling.fontSize === "lg"
                    ? "18px"
                    : "16px",
    };

    return (
        <div
            className="w-full p-4 shadow-sm border-b relative z-50"
            style={style}
        >
            <div className="flex items-center gap-3 max-w-7xl mx-auto">
                {image && (
                    <img
                        src={image}
                        alt="Announcement"
                        className="w-12 h-12 rounded object-cover"
                    />
                )}
                <div className="flex-1">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-sm opacity-90">{body}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="opacity-50 hover:opacity-75"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const ModalTemplate: React.FC<TemplateProps> = ({
    title,
    body,
    image,
    styling,
    onClose,
}) => {
    const fontSize = styling.fontSize === "sm" ? "14px" : styling.fontSize === "lg" ? "20px" : "16px";
    const titleSize = styling.fontSize === "sm" ? "18px" : styling.fontSize === "lg" ? "24px" : "20px";

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                className="rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-0"
                style={{
                    backgroundColor: styling.backgroundColor,
                    color: styling.textColor,
                }}
            >
                {/* Header with close button */}
                <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: `${styling.textColor}15` }}>
                    <h4
                        className="font-bold tracking-tight"
                        style={{
                            textAlign: styling.alignment,
                            fontSize: titleSize,
                            color: styling.textColor,
                        }}
                    >
                        {title}
                    </h4>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 transition-all duration-200 hover:bg-opacity-10"
                            style={{
                                backgroundColor: `${styling.textColor}00`,
                                color: styling.textColor,
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}15`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}00`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Image */}
                {image && (
                    <div className="relative w-full aspect-video overflow-hidden">
                        <img
                            src={image}
                            alt="Announcement"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="px-6 py-5">
                    <p
                        className="leading-relaxed"
                        style={{
                            textAlign: styling.alignment,
                            fontSize: fontSize,
                            color: styling.textColor,
                            opacity: 0.9,
                        }}
                    >
                        {body}
                    </p>
                </div>

                {/* Footer with action button */}
                {onClose && (
                    <div className="px-6 pb-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-full font-semibold transition-all duration-200 hover:opacity-90"
                            style={{
                                backgroundColor: styling.textColor,
                                color: styling.backgroundColor,
                                fontSize: "14px",
                            }}
                        >
                            Got it
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export const NotificationTemplate: React.FC<TemplateProps> = ({
    title,
    body,
    styling,
    onClose,
}) => {
    const fontSize = styling.fontSize === "sm" ? "13px" : styling.fontSize === "lg" ? "16px" : "14px";
    const titleSize = styling.fontSize === "sm" ? "14px" : styling.fontSize === "lg" ? "17px" : "15px";

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-top-2">
            <div
                className="rounded-2xl shadow-2xl border-0 overflow-hidden backdrop-blur-sm"
                style={{
                    backgroundColor: styling.backgroundColor,
                    color: styling.textColor,
                }}
            >
                <div className="flex items-start gap-3 p-4">
                    <div className="rounded-full p-2 mt-0.5" style={{ backgroundColor: `${styling.textColor}15` }}>
                        <Bell className="w-4 h-4" style={{ color: styling.textColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4
                            className="font-bold leading-tight mb-1"
                            style={{
                                fontSize: titleSize,
                                color: styling.textColor,
                            }}
                        >
                            {title}
                        </h4>
                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: fontSize,
                                color: styling.textColor,
                                opacity: 0.85,
                            }}
                        >
                            {body}
                        </p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-full p-1.5 transition-all duration-200 flex-shrink-0"
                            style={{
                                backgroundColor: `${styling.textColor}00`,
                                color: styling.textColor,
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}15`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}00`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const PopupTemplate: React.FC<TemplateProps> = ({
    title,
    body,
    image,
    styling,
    onClose,
}) => {
    const fontSize = styling.fontSize === "sm" ? "13px" : styling.fontSize === "lg" ? "16px" : "14px";
    const titleSize = styling.fontSize === "sm" ? "15px" : styling.fontSize === "lg" ? "18px" : "16px";

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-2">
            <div
                className="rounded-2xl shadow-2xl border-0 overflow-hidden backdrop-blur-sm"
                style={{
                    backgroundColor: styling.backgroundColor,
                    color: styling.textColor,
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-4 pb-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="rounded-full p-2 mt-0.5" style={{ backgroundColor: `${styling.textColor}15` }}>
                            <Bell className="w-4 h-4" style={{ color: styling.textColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4
                                className="font-bold leading-tight"
                                style={{
                                    textAlign: styling.alignment,
                                    fontSize: titleSize,
                                    color: styling.textColor,
                                }}
                            >
                                {title}
                            </h4>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="rounded-full p-1.5 transition-all duration-200 ml-2 flex-shrink-0"
                            style={{
                                backgroundColor: `${styling.textColor}00`,
                                color: styling.textColor,
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}15`}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${styling.textColor}00`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Image */}
                {image && (
                    <div className="px-5 pb-3">
                        <img
                            src={image}
                            alt="Announcement"
                            className="w-full h-32 object-cover rounded-xl"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="px-5 pb-4">
                    <p
                        className="leading-relaxed"
                        style={{
                            textAlign: styling.alignment,
                            fontSize: fontSize,
                            color: styling.textColor,
                            opacity: 0.85,
                        }}
                    >
                        {body}
                    </p>
                </div>
            </div>
        </div>
    );
};
