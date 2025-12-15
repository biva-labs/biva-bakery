import React from "react";
import { X, Bell } from "lucide-react";

// ... (Interfaces remain the same) ...

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

// BannerTemplate was mostly fine, just included here for completeness
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
            role="region"
            aria-label="Announcement banner"
            className="fixed top-0 left-0 w-full z-[9999] shadow-sm border-b"
            style={{
                backgroundColor: style.backgroundColor,
                color: style.color,
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                {image && (
                    <img
                        src={image}
                        alt="Announcement"
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                )}
                <div className="flex-1">
                    <h4
                        className="font-semibold mb-1"
                        style={{
                            fontSize: style.fontSize,
                            textAlign: styling.alignment,
                        }}
                    >
                        {title}
                    </h4>
                    <p
                        className="text-sm opacity-90"
                        style={{ textAlign: styling.alignment }}
                    >
                        {body}
                    </p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        aria-label="Close announcement"
                        className="ml-4 opacity-70 hover:opacity-90 p-1 rounded"
                        style={{ color: style.color }}
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
    // FIX: Added size mapping so CSS is valid ("14px" instead of "sm")
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
            role="dialog"
            aria-modal="true"
            aria-label="Announcement modal"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4"
        >
            <div
                className="rounded-lg shadow-xl max-w-md w-full overflow-hidden"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                }}
            >
                {image && (
                    <img
                        src={image}
                        alt="Announcement"
                        className="w-full h-48 object-cover"
                        style={{ display: "block" }}
                    />
                )}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h4
                            className="font-semibold text-lg"
                            style={{ fontSize: style.fontSize }}
                        >
                            {title}
                        </h4>
                        {onClose && (
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                className="opacity-70 hover:opacity-90 p-1 rounded"
                                style={{ color: style.color }}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* FIX: Changed fontSize: fontSize to fontSize: style.fontSize */}
                    <div className="mb-4">
                        <p
                            className="leading-relaxed"
                            style={{
                                textAlign: styling.alignment,
                                fontSize: style.fontSize,
                                color: styling.textColor,
                                opacity: 0.9,
                            }}
                        >
                            {body}
                        </p>
                    </div>

                    {onClose && (
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                                style={{ color: style.color }}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
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
    // FIX: Added missing style object definition
    const style = {
        backgroundColor: styling.backgroundColor,
        color: styling.textColor,
    };

    const fontSize =
        styling.fontSize === "sm"
            ? "13px"
            : styling.fontSize === "lg"
              ? "16px"
              : "14px";

    const titleSize =
        styling.fontSize === "sm"
            ? "14px"
            : styling.fontSize === "lg"
              ? "17px"
              : "15px";

    return (
        <div
            aria-live="polite"
            className="fixed top-4 right-4 z-[9999] max-w-sm"
            style={{ pointerEvents: "auto" }}
        >
            <div
                className="p-4 rounded-lg shadow-lg border"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                }}
                role="status"
            >
                <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <h4
                            className="font-medium text-sm mb-1"
                            style={{ fontSize: titleSize }}
                        >
                            {title}
                        </h4>
                        <p
                            className="text-sm"
                            style={{ color: style.color, fontSize: fontSize }}
                        >
                            {body}
                        </p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Close notification"
                            className="opacity-50 hover:opacity-75 p-1 rounded"
                            style={{ color: style.color }}
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
            className="fixed bottom-4 right-4 z-[9999] max-w-sm"
            style={{ pointerEvents: "auto" }}
        >
            <div
                className="p-4 rounded-lg shadow-lg border"
                style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                }}
            >
                <div className="flex justify-between items-start mb-3">
                    <h4
                        className="font-medium text-sm"
                        style={{ fontSize: style.fontSize }}
                    >
                        {title}
                    </h4>
                    {onClose && (
                        <button
                            onClick={onClose}
                            aria-label="Close popup"
                            className="opacity-50 hover:opacity-75 p-1 rounded"
                            style={{ color: style.color }}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {image && (
                    <div className="pb-3">
                        <img
                            src={image}
                            alt="Announcement"
                            className="w-full h-32 object-cover rounded-xl"
                        />
                    </div>
                )}

                {/* FIX: Changed fontSize: fontSize to fontSize: style.fontSize */}
                <div className="pb-4">
                    <p
                        className="leading-relaxed"
                        style={{
                            textAlign: styling.alignment,
                            fontSize: style.fontSize,
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
