"use client";

import React, { useEffect } from "react";
import { toast as sonner, type ToastT, type ExternalToast } from "sonner";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster as Sonner } from "sonner";

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);
export type PromiseExternalToast = Omit<ExternalToast, "description">;
export type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | React.ReactNode;
  success?:
    | string
    | React.ReactNode
    | ((data: ToastData) => React.ReactNode | string);
  error?: string | React.ReactNode | ((error: any) => React.ReactNode | string);
  description?:
    | string
    | React.ReactNode
    | ((data: any) => React.ReactNode | string);
  finally?: () => void | Promise<void>;
};

export type ToastOptions = Omit<
  ExternalToast,
  | "actionButtonStyle"
  | "cancelButtonStyle"
  | "invert"
  | "important"
  | "icon"
  | "action"
  | "cancel"
  | "unstyled"
  | "classNames"
  | "style"
  | "descriptionClassName"
  | "onDismiss"
  | "onAutoClose"
> & {
  onDismiss?: () => void;
  onAutoClose?: () => void;
};

export type ToasterProps = Omit<
  React.ComponentProps<typeof Sonner>,
  | "cn"
  | "style"
  | "className"
  | "closeButton"
  | "richColors"
  | "invert"
  | "theme"
  | "hotkey"
  | "containerAriaLabel"
  | "loadingIcon"
  | "icons"
  | "toastOptions"
> & {
  toastOptions?: ToastOptions;
};

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner {...props} />;
};

const toast = {
  info: (message: string | React.ReactNode, opts?: ToastOptions) => {
    return sonner.custom(
      (t) => (
        <div className="w-[356px] border border-info border-opacity-10 shadow-md bg-info-accent px-2 py-3 rounded-lg flex flex-col">
          <div
            className={cn([
              "flex space-x-2 items-center",
              opts?.description && "items-start",
              opts?.className,
            ])}
          >
            <InfoIcon
              className={cn([
                "w-5 h-5 fill-info stroke-info-accent",
                opts?.description && "w-6 h-6",
              ])}
            />

            {React.isValidElement(message) ? (
              <div className="w-full">{message}</div>
            ) : (
              <div className="flex flex-col w-full text-info space-y-2">
                <h1
                  className={cn(["text-sm", opts?.description && "text-base"])}
                >
                  {message}
                </h1>
                {opts?.description && (
                  <p className="text-sm">{opts?.description}</p>
                )}
              </div>
            )}

            {opts?.closeButton && (
              <XIcon
                className="w-4 h-4 fill-grey-400 stroke-gray-400 cursor-pointer"
                onClick={() => {
                  if (opts.onDismiss) opts.onDismiss();
                  sonner.dismiss(t);
                }}
              />
            )}
          </div>
        </div>
      ),
      opts
    );
  },

  success: (message: string | React.ReactNode, opts?: ToastOptions) => {
    return sonner.custom(
      (t) => (
        <div className="w-[356px] border border-success border-opacity-10 shadow-md bg-success-accent px-2 py-3 rounded-lg flex flex-col">
          <div
            className={cn([
              "flex space-x-2 items-center",
              opts?.description && "items-start",
              opts?.className,
            ])}
          >
            <CircleCheckIcon
              className={cn([
                "w-5 h-5 fill-success stroke-success-accent",
                opts?.description && "w-6 h-6",
              ])}
            />
            {React.isValidElement(message) ? (
              <div className="w-full">{message}</div>
            ) : (
              <div className="flex flex-col w-full text-success space-y-2">
                <h1
                  className={cn(["text-sm", opts?.description && "text-base"])}
                >
                  {message}
                </h1>
                {opts?.description && (
                  <p className="text-sm">{opts?.description}</p>
                )}
              </div>
            )}

            {opts?.closeButton && (
              <XIcon
                className="w-4 h-4 fill-grey-400 stroke-gray-400 cursor-pointer"
                onClick={() => {
                  if (opts.onDismiss) opts.onDismiss();
                  sonner.dismiss(t);
                }}
              />
            )}
          </div>
        </div>
      ),
      opts
    );
  },

  warning: (message: string | React.ReactNode, opts?: ToastOptions) => {
    return sonner.custom(
      (t) => (
        <div className="w-[356px] border border-warning border-opacity-10 shadow-md bg-warning-accent px-2 py-3 rounded-lg flex flex-col">
          <div
            className={cn([
              "flex space-x-2 items-center",
              opts?.description && "items-start",
              opts?.className,
            ])}
          >
            <CircleAlertIcon
              className={cn([
                "w-5 h-5 fill-warning stroke-warning-accent",
                opts?.description && "w-6 h-6",
              ])}
            />
            {React.isValidElement(message) ? (
              <div className="w-full">{message}</div>
            ) : (
              <div className="flex flex-col w-full text-warning space-y-2">
                <h1
                  className={cn(["text-sm", opts?.description && "text-base"])}
                >
                  {message}
                </h1>
                {opts?.description && (
                  <p className="text-sm">{opts?.description}</p>
                )}
              </div>
            )}

            {opts?.closeButton && (
              <XIcon
                className="w-4 h-4 fill-grey-400 stroke-gray-400 cursor-pointer"
                onClick={() => {
                  if (opts.onDismiss) opts.onDismiss();
                  sonner.dismiss(t);
                }}
              />
            )}
          </div>
        </div>
      ),
      opts
    );
  },

  error: (message: string | React.ReactNode, opts?: ToastOptions) => {
    return sonner.custom(
      (t) => (
        <div className="w-[356px] border border-danger border-opacity-10 shadow-md bg-danger-accent px-2 py-3 rounded-lg flex flex-col">
          <div
            className={cn([
              "flex space-x-2 items-center",
              opts?.description && "items-start",
              opts?.className,
            ])}
          >
            <CircleXIcon
              className={cn([
                "w-5 h-5 fill-danger stroke-danger-accent",
                opts?.description && "w-6 h-6",
              ])}
            />

            {React.isValidElement(message) ? (
              <div className="w-full">{message}</div>
            ) : (
              <div className="flex flex-col w-full text-danger space-y-2">
                <h1
                  className={cn(["text-sm", opts?.description && "text-base"])}
                >
                  {message}
                </h1>
                {opts?.description && (
                  <p className="text-sm">{opts?.description}</p>
                )}
              </div>
            )}

            {opts?.closeButton && (
              <XIcon
                className="w-4 h-4 fill-grey-400 stroke-gray-400 cursor-pointer"
                onClick={() => {
                  if (opts.onDismiss) opts.onDismiss();
                  sonner.dismiss(t);
                }}
              />
            )}
          </div>
        </div>
      ),
      opts
    );
  },

  promise: async (
    promise: PromiseT,
    opts?: Omit<PromiseData, "description">
  ) => {
    sonner.custom((t) => <Loading t={t} promise={promise} opts={opts} />, {
      ...opts,
      description: "",
    });
  },
};

type LoadingProps = {
  t: string | number;
  promise: PromiseT;
  opts?: Omit<PromiseData, "description">;
};

const Loading = ({ t, promise, opts }: LoadingProps) => {
  const [isLoading, setLoading] = React.useState(true);
  const [finalChildren, setFinalChildren] = React.useState<React.ReactNode>();
  const [state, setState] = React.useState<"success" | "error">("success");

  const initLoading = async () => {
    try {
      let data = promise;

      if (typeof promise === "function") data = await promise();

      if (typeof opts?.success === "function") {
        setFinalChildren(opts.success(data));
        return;
      }

      setFinalChildren(opts?.success ? opts.success : "Success");
      setState("success");
    } catch (error) {
      setFinalChildren(opts?.error ? opts.error : "Error");
      setState("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-[356px] shadow-md bg-background px-2 py-3 items-center rounded-lg flex space-x-2">
          <Loader2Icon className="w-4 h-4  stroke-primary animate-spin" />
          <p className="text-text-default text-sm">
            {opts?.loading ? opts.loading : "Loading..."}
          </p>
        </div>
      ) : (
        <div
          className={cn([
            "w-[356px] border border-success border-opacity-10 shadow-md bg-success-accent px-2 py-3 rounded-lg flex flex-col",
            state === "error" && "bg-danger-accent border-danger",
          ])}
        >
          <div className={cn(["flex space-x-2 items-center", opts?.className])}>
            {state === "success" && (
              <CircleCheckIcon
                className={"w-5 h-5 fill-success stroke-success-accent"}
              />
            )}

            {state === "error" && (
              <CircleXIcon
                className={"w-5 h-5 fill-danger stroke-danger-accent"}
              />
            )}

            {React.isValidElement(finalChildren) ? (
              <div className="w-full">{finalChildren}</div>
            ) : (
              <div
                className={cn([
                  "w-full text-success text-sm",
                  state === "error" && "text-danger",
                ])}
              >
                {finalChildren}
              </div>
            )}

            {opts?.closeButton && (
              <XIcon
                className="w-4 h-4 fill-grey-400 stroke-gray-400 cursor-pointer"
                onClick={() => {
                  if (opts.onDismiss) opts.onDismiss(t as unknown as ToastT);
                  sonner.dismiss(t);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Toaster, toast };