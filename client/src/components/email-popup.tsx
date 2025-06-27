import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeEmail = useMutation({
    mutationFn: async (data: EmailFormData) => {
      const response = await apiRequest("POST", "/api/subscribe", {
        email: data.email,
        source: "landing_page_popup",
      });
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      // Track email signup
      apiRequest("POST", "/api/analytics", {
        eventName: "Email_Signup",
        eventData: { source: "popup", email: form.getValues().email }
      }).catch(console.error);
      
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    subscribeEmail.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 rounded-3xl p-8">
        {!isSubmitted ? (
          <>
            <DialogHeader className="text-center mb-6">
              <div className="w-16 h-16 nurse-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Free Nurse Self-Care Tracker!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Enter your email to download it instantly and get exclusive nursing wellness tips.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="px-4 py-3 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={subscribeEmail.isPending}
                  className="w-full nurse-gradient-blue text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {subscribeEmail.isPending ? "Subscribing..." : "Get Free Tracker"}
                </Button>
              </form>
            </Form>

            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 font-medium mt-4"
            >
              No thanks, I'll skip this
            </Button>
          </>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <DialogTitle className="font-semibold text-gray-900 mb-2">Thank you!</DialogTitle>
            <DialogDescription className="text-gray-600">
              Check your email for the free tracker.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
