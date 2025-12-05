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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
                className="bg-white rounded-lg shadow-xl max-w-md w-full"
                style={style}
            >
                {image && (
                    <img
                        src={image}
                        alt="Announcement"
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                )}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-lg">{title}</h4>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="opacity-50 hover:opacity-75"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <p className="mb-4">{body}</p>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                        >
                            Close
                        </button>
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
    const style: React.CSSProperties = {
        backgroundColor: styling.backgroundColor,
        color: styling.textColor,
        fontSize:
            styling.fontSize === "sm"
                ? "14px"
                : styling.fontSize === "lg"
                  ? "18px"
                  : "16px",
    };

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div
                className="p-4 bg-white rounded-lg shadow-lg border"
                style={style}
            >
                <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{title}</h4>
                        <p className="text-sm">{body}</p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="opacity-50 hover:opacity-75"
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
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
            <div
                className="p-4 bg-white rounded-lg shadow-lg border"
                style={style}
            >
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-sm">{title}</h4>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="opacity-50 hover:opacity-75"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <p className="text-sm mb-3">{body}</p>
                {image && (
                    <img
                        src={image}
                        alt="Announcement"
                        className="w-full h-20 object-cover rounded"
                    />
                )}
            </div>
        </div>
    );
};
