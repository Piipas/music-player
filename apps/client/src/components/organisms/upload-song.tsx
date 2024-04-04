import { Form } from "react-router-dom";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/dialog";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { songApi } from "@/lib/api/song-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSongBodySchema } from "mp-validation";

function UploadSong() {
  const [audioError, setAudioError] = useState<string>();
  const [imageError, setImageError] = useState<string>();

  const songForm = useForm({
    resolver: zodResolver(newSongBodySchema),
    defaultValues: {
      image: "",
      audio: "",
      name: "",
    },
  });

  const { mutate: songMutate } = useMutation({
    mutationFn: (songInfo) => songApi.createSong(songInfo),
    onSuccess: () => {},
  });

  const onSubmit = (songInfo: any) => songMutate(songInfo);

  const onDropAccepted = (files: any) => {
    console.log(files);
  };

  const onDropRejected = (files: any) => {
    console.log(files);
  };

  const {
    getRootProps: audioRootProps,
    getInputProps: audioInputProps,
    isDragActive: isAudioActive,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: { "audio/*": [] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  const {
    getRootProps: imageRootProps,
    getInputProps: imageInputProps,
    isDragActive: isImageActive,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-main">Upload new song.</DialogTitle>
        <DialogDescription>Upload new song and let others enjoy your music.</DialogDescription>
        <FormProvider {...songForm}>
          <form onSubmit={songForm.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={songForm.control}
                name="audio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...audioRootProps()}
                        className={cn(
                          "h-[200px] border-input rounded-lg flex items-center justify-center cursor-pointer",
                          isAudioActive ? "border-2" : "border",
                        )}
                      >
                        <Input accept="audio/*" {...audioInputProps()} {...field} />
                        {isAudioActive ? <p>Drop it here ...</p> : <p>Drag your song audio file ...</p>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={songForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        {...imageRootProps()}
                        className={cn(
                          "h-[200px] border-input rounded-lg flex items-center justify-center cursor-pointer",
                          isImageActive ? "border-2" : "border",
                        )}
                      >
                        <Input {...imageInputProps()} {...field} />
                        {isImageActive ? <p>Drop it here ...</p> : <p>Drag your song image file ...</p>}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={songForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Song name - eg: Stakatak sbakatak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="grid grid-cols-2 gap-4">
                <DialogClose asChild>
                  <Button variant={"outline"} type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant={"main"} type="submit">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </DialogHeader>
    </DialogContent>
  );
}

export default UploadSong;
